const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Project=require('./models/projectModel')
const Technology =require('./models/technology')
const fs = require('fs'); // File system module for deleting files
const cors=require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/resumeBooster', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Define a schema and model for image data
const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});
const Image = mongoose.model('Image', imageSchema);

// Configure Multer storage
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

// Helper function to delete files from the uploads folder
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Failed to delete ${filePath}:`, err);
    else console.log(`${filePath} deleted successfully.`);
  });
};

// Handle image upload
app.post('/upload', upload.single('img'), async (req, res) => {
  try {
    // Delete all previous images from the database and uploads folder
    const oldImages = await Image.find();
    oldImages.forEach((image) => deleteFile(image.path));
    await Image.deleteMany({});

    // Save the new image to the database
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
    });
    await newImage.save();

    res.json({ imageUrl: `http://localhost:5000/${req.file.path}` });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function getProjectsByTechnologies(technologyNames) {
  try {
    // Find technology IDs based on the provided names
    const techDocs = await Technology.find({ name: { $in: technologyNames } });

    // If no technologies found, return an empty array
    if (techDocs.length === 0) {
      return [];
    }

    // Extract technology IDs
    const techIds = techDocs.map(tech => tech._id);

    // Find projects that use the identified technology IDs
    const projects = await Project.find({ technologies: { $in: techIds } }).populate('technologies');

    return projects;
  } catch (error) {
    console.error('Error retrieving projects:', error);
    throw error;  // Re-throw error for the API response
  }
}

// API endpoint to get projects by technology names
app.post('/api/projects', async (req, res) => {
  const technologyNames = req.body.technologies; // Expecting { technologies: [...] } in the request body

  if (!Array.isArray(technologyNames) || technologyNames.length === 0) {
    return res.status(400).json({ message: 'Please provide an array of technology names.' });
  }

  try {
    const projects = await getProjectsByTechnologies(technologyNames);
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving projects.', error: error.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});

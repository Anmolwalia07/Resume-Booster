const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  technologies: [{ type: Schema.Types.ObjectId, ref: 'Technology' }]
});

module.exports = mongoose.model('Project', projectSchema);
     
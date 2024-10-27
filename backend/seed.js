const mongoose = require('mongoose');
const Technology = require('./models/technology');
const Project = require('./models/projectModel');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/resumeBooster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const technologies = [
  { name: 'JavaScript' },
  { name: 'Python' },
  { name: 'React' },
  { name: 'Java' },
  { name: 'Node.js' },
  { name: 'C++' },
  { name: 'SQL' },
  { name: 'Machine Learning' },
  { name: 'Blockchain' },
  { name: 'Android' },
  { name: 'TypeScript' },
  { name: 'Ruby on Rails' },
  { name: 'Django' },
  { name: 'Flask' },
  { name: 'GraphQL' },
  { name: 'Angular' },
  { name: 'Vue.js' },
  { name: 'Spring Boot' },
  { name: 'Redis' },
  { name: 'Docker' },
  { name: 'Kubernetes' },
  { name: 'Firebase' },
  { name: 'Rust' },
  { name: 'Swift' },
  { name: 'PHP' }
];

const projects = [
  {
    name: 'E-commerce Product Recommendation System',
    description: 'Build a product recommendation system using JavaScript.',
    technologies: ['JavaScript']
  },
  {
    name: 'Automated Stock Price Tracker',
    description: 'Scrape stock prices and send daily alerts.',
    technologies: ['Python']
  },
  {
    name: 'Task Management App with Drag-and-Drop',
    description: 'Add drag-and-drop to Taskie using React.',
    technologies: ['React']
  },
  {
    name: 'Library Management System',
    description: 'Console-based library management system.',
    technologies: ['Java']
  },
  {
    name: 'Real-Time Voting App',
    description: 'Voting app with live updates using Node.js.',
    technologies: ['Node.js']
  },
  {
    name: 'Inventory Management System',
    description: 'Console-based inventory management system.',
    technologies: ['C++']
  },
  {
    name: 'Employee Management System',
    description: 'Manage employee records using SQL.',
    technologies: ['SQL']
  },
  {
    name: 'Handwritten Digit Recognition',
    description: 'Build a neural network to recognize digits.',
    technologies: ['Machine Learning']
  },
  {
    name: 'Decentralized Voting App',
    description: 'Voting app on Ethereum blockchain.',
    technologies: ['Blockchain']
  },
  {
    name: 'Personal Finance App',
    description: 'Mobile app for expense tracking and budgeting.',
    technologies: ['Android']
  },
  {
    name: 'TypeScript Weather App',
    description: 'Build a weather app with TypeScript fetching data from a weather API.',
    technologies: ['TypeScript']
  },
  {
    name: 'Blog Platform',
    description: 'Create a blog platform using Ruby on Rails with user authentication.',
    technologies: ['Ruby on Rails']
  },
  {
    name: 'E-commerce Backend',
    description: 'Develop an e-commerce backend system with Django.',
    technologies: ['Django']
  },
  {
    name: 'Simple REST API',
    description: 'Create a simple RESTful API using Flask to manage notes.',
    technologies: ['Flask']
  },
  {
    name: 'GraphQL API for Books',
    description: 'Build a GraphQL API to manage a collection of books.',
    technologies: ['GraphQL']
  },
  {
    name: 'Task Management Dashboard',
    description: 'Develop a dashboard for task management using Angular.',
    technologies: ['Angular']
  },
  {
    name: 'Real-Time Chat Application',
    description: 'Create a real-time chat application using Vue.js and Firebase.',
    technologies: ['Vue.js']
  },
  {
    name: 'Online Exam System',
    description: 'Build an online examination system using Spring Boot.',
    technologies: ['Spring Boot']
  },
  {
    name: 'Session Management System',
    description: 'Create a session management system for a web application using Redis.',
    technologies: ['Redis']
  },
  {
    name: 'Containerized Microservices Application',
    description: 'Develop a microservices architecture and containerize the services using Docker.',
    technologies: ['Docker']
  },
  {
    name: 'Deploy a Web Application',
    description: 'Use Kubernetes to deploy and manage a web application.',
    technologies: ['Kubernetes']
  },
  {
    name: 'Real-Time Collaboration App',
    description: 'Build a real-time collaboration app using Firebase.',
    technologies: ['Firebase']
  },
  {
    name: 'Command-Line Todo App',
    description: 'Create a command-line todo application using Rust.',
    technologies: ['Rust']
  },
  {
    name: 'iOS Note-Taking App',
    description: 'Develop a note-taking app for iOS using Swift.',
    technologies: ['Swift']
  },
  {
    name: 'CMS (Content Management System)',
    description: 'Build a simple CMS using PHP with user authentication.',
    technologies: ['PHP']
  }
];

async function seedDatabase() {
  try {
    // Insert technologies
    const techDocs = await Technology.insertMany(technologies);
    console.log('Technologies inserted:', techDocs);

    // Map technology names to their ObjectIds
    const techMap = techDocs.reduce((map, tech) => {
      map[tech.name] = tech._id;
      return map;
    }, {});

    // Insert projects with referenced technologies
    const projectDocs = projects.map(project => ({
      ...project,
      technologies: project.technologies.map(name => techMap[name])
    }));

    await Project.insertMany(projectDocs);
    console.log('Projects inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
    
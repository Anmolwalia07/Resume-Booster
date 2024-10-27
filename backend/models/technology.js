const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Technology', technologySchema);

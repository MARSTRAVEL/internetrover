const mongoose = require('mongoose');

const jobhuntingSchema = new mongoose.Schema({
  'companyName': String,
  'position': String,
  'task': String,
  'cv': String,
  'coverLetter': String,
  'date': String,
  'result': String,
  'link':String,
});

module.exports = mongoose.model('jobhunting', jobhuntingSchema);

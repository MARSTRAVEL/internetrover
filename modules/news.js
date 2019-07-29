const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  'date': Date,
  'title': String,
  'link': String,
  'description': String,
  'content': String,
});

module.exports = mongoose.model('news', newsSchema);

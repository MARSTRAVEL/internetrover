const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  user: String,
  description: String,
  content: String,
  writer: String,
  tag: String,
  date: String,
});

const blog = mongoose.model('post', postSchema);
module.exports = blog;

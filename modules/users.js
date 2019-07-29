const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName : {
    type:     String,
    required: true,
    trim:      true,
    unique:     true,
  },
  firstName: {
    type:     String,
    required: true,

  },
  lastName: {
    type: String,
  },
  eMail: {
    type:     String,
    required: true,
  },
  passWord: {
    type:     String,
    required: true,
    unique:   true,
  },
  createdDate:{
    type:     Date,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);

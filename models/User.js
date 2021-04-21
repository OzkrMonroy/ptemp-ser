const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    trim: true
  },
  skills: {
    type: Object,
  },
  hobbies: {
    type: Array
  },
  description: {
    type: String
  },
  career: {
    type: String
  },
  socialMedia: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UsersSchema);
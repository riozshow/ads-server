const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
  },
  content: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 1000,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Post', postSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema, 'users');



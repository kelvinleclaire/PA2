import mongoose = require('mongoose');

export const macdpsUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required']
  },name: {
    type: String,
    required: [true, 'name is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  role: {
    type: String,
    required: [true, 'role is required']
  }
})

module.exports = macdpsUserSchema;

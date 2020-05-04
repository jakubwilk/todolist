const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    lowercase: true
  },
}, {
  timestamps: true,
});



const Users = mongoose.model('Users', userSchema);

module.exports = Users;
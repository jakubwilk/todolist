const mongoose = require('mongoose');
const passportLocalMongose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
  },
  blocked: {
    type: Boolean,
  }
}, {
  timestamps: true,
});

userSchema.plugin(passportLocalMongose, { usernameField: 'email' })

const User = mongoose.model('Users', userSchema);

module.exports = User;
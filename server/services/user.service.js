const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {
  async loginUser(req, res, next) {
    const token = jwt.sign({ id: req.user._id }, process.env['JWT_HASH'], { expiresIn: 86400 });

    res.cookie('auth_token', token, { maxAge: 1000 * 60 * 1440, httpOnly: true }).json({ status: 200, type: 'success', message: 'User logged' });
  },

  async registerUser(req, res, next) {
    const { email, password } = req.body;
    const user = new User({ email });
    await User.register(user, password);

    res.json({ status: 201, type: 'success', message: 'User created successfully' });
  }
}
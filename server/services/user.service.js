const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator')
const User = require('../models/user.model');

async function findUser(email) { 
  const user = await User.findOne({ email: email });

  return user;
}

const userValidationRules = () => {
  return [
    body('email', 'Incorrect email address').isEmail().escape().trim(),
    body('password', 'Password contains not allowed characters').escape().trim(),
  ]
}

module.exports = {
  userValidationRules,

  async loginUser(req, res, next) {
    const { email, password } = req.body;

    const errors = validationResult(req);
    const errorsMessage = [];

    if (!errors.isEmpty()) {
      errors.array().map(error => errorsMessage.push(error.msg));
    }

    if (errorsMessage.length !== 0) {
      return res.json({ status: 401, type: 'error', message: errorsMessage });
    }

    const user = await findUser(email);

    if (!user) {
      return res.json({ status: 401, type: 'error', message: ['Account with this email address not exists'] });
    }

    const token = jwt.sign({ id: user._id }, process.env['JWT_HASH'], { expiresIn: 86400 });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.json({ status: 500, type: 'error', message: ['Error while processing your query'] });
      }

      if (!result) {
        return res.json({ status: 401, type: 'error', message: ['Wrong password'] });
      } 

      return res.cookie('auth_token', token, { maxAge: 1000 * 60 * 1440, httpOnly: true,  })
                .json({ status: 201, type: 'success', message: ['User successfully logged'] });
    });
  },

  async registerUser(req, res, next) {
    const { email, password } = req.body;
    const user = await findUser(email);

    const errors = validationResult(req);
    const errorsMessage = [];

    if (!errors.isEmpty()) {
      errors.array().map(error => errorsMessage.push(error.msg));
    }

    if (errorsMessage.length !== 0) {
      return res.json({ status: 401, type: 'error', message: errorsMessage });
    }

    if (user) {
      return res.json({ status: 401, type: 'error', message: ['Email is already in use'] });
    }
    
    const member = new User({ email: email, password: password });

    bcrypt.hash(member.password, parseInt(process.env['HASH_ROUNDS']), (err, hash) => {
      if (err) {
        return res.json({ status: 500, type: 'error', message: ['Error while processing your query'] });
      }

      member.password = hash;
      member.save()
        .then(user => {
          return res.json({ status: 201, type: 'success', message: ['User created successfully'] });
        })
        .catch(err => {
          return res.json({ status: 500, type: 'error', message: ['Error while processing your query'] });
        })
    });
  },

  async checkToken(req, res, next) {
    const token = req.cookies;

    const auth = await jwt.verify(token.auth_token, process.env['JWT_HASH'], (err, decoded) => {
      if (err) {
        return false;
      }

      return true;
    });

    return auth;
  },
}
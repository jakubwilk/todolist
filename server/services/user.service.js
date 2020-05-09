const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

async function findUser(email) { 
  const user = await User.findOne({ email: email });

  return user;
}

const emailValidation = email => {
  const regex = /^\w+([\\.-]?\w+)+@\w+([\\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
  if (!email.match(regex)) {
    return 'Incorrect email address';
  }
}

module.exports = {
  async loginUser(req, res, next) {
    const { email, password } = req.body;

    const messageValidation = emailValidation(email);

    if (messageValidation !== undefined) {
      return res.json({ status: 200, type: 'error', message: messageValidation });
    }

    const user = await findUser(email);

    if (!user) {
      return res.json({ status: 200, type: 'error', message: 'Incorrect email' });
    }

    const token = jwt.sign({ id: user._id }, process.env['JWT_HASH'], { expiresIn: 86400 });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.json({ status: 500, type: 'error', message: 'Error while processing your query' });
      }

      if (!result) {
        return res.json({ status: 200, type: 'error', message: 'Wrong password' });
      } 

      return res.cookie('auth_token', token, { maxAge: 1000 * 60 * 1440, httpOnly: true })
                .json({ status: 201, type: 'success', message: 'User successfully logged' });
    });
  },

  async registerUser(req, res, next) {
    const { email, password } = req.body;
    const user = await findUser(email);

    const messageValidation = emailValidation(email);

    if (messageValidation !== undefined) {
      return res.json({ status: 200, type: 'error', message: messageValidation });
    }

    if (user) {
      return res.json({ status: 200, type: 'error', message: 'Email is already in use' });
    }
    
    const member = new User({ email: email, password: password });

    bcrypt.hash(member.password, parseInt(process.env['HASH_ROUNDS']), (err, hash) => {
      if (err) {
        return res.json({ status: 500, type: 'error', message: 'Error while processing your query' });
      }

      member.password = hash;
      member.save()
        .then(user => {
          return res.json({ status: 201, type: 'success', message: 'User created successfully' });
        })
        .catch(err => {
          return res.json({ status: 500, type: 'error', message: 'Error while processing your query' });
        })
    });
  },
}
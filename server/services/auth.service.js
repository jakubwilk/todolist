const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator')
const User = require('../models/user.model');

const userValidationRules = () => {
	return [
    	body('email', 'Incorrect email address').not().isEmail().escape().trim(),
    	body('password', 'Password contains not allowed characters').not().escape().trim(),
  	]
}

module.exports = {
	userValidationRules,

  	async loginUser(req, res, next) {
    	const { email, password } = req.body.user;

    	const errors = validationResult(req);
    	const errorsMessage = [];

    	if (!errors.isEmpty()) {
     		errors.array().map(error => errorsMessage.push(error.msg));
    	}

    	if (errorsMessage.length !== 0) {
      		return res.send({ status: 200, type: 'error', message: errorsMessage });
    	}

    	const user = await User.findOne({ email: email });

    	if (!user) {
      		return res.send({ status: 200, type: 'error', message: ['Account with this email address not exists'] });
    	}

    	const token = jwt.sign({ id: user._id }, process.env['JWT_HASH'], { expiresIn: 86400 });

    	bcrypt.compare(password, user.password, (err, result) => {
      		if (err) {
        		return res.send({ status: 500, type: 'error', message: ['Error while processing your query'] });
      		}

      		if (!result) {
        		return res.send({ status: 200, type: 'error', message: ['Wrong password'] });
      		} 

      		res.cookie('auth_token', token, { maxAge: 1000 * 60 * 1440, httpOnly: true });
      		return res.send({ status: 200, type: 'success', message: ['User successfully logged'] });
    	});
  	},

  	async registerUser(req, res, next) {
    	const { email, password } = req.body.user;

    	const user = await User.findOne({ email: email });

    	const errors = validationResult(req);
    	const errorsMessage = [];

    	if (!errors.isEmpty()) {
      		errors.array().map(error => errorsMessage.push(error.msg));
    	}

    	if (errorsMessage.length !== 0) {
      		return res.send({ status: 200, type: 'error', message: errorsMessage });
    	}

    	if (user) {
      		return res.send({ status: 200, type: 'error', message: ['Email is already in use'] });
    	}
    
    	const member = new User({ first_name: '', last_name: '', email: email, password: password, avatar: 'http://localhost:44912/uploads/avatardefault.png', description: '', blocked: false });

    	bcrypt.hash(member.password, parseInt(process.env['HASH_ROUNDS']), (err, hash) => {
      		if (err) {
        		return res.send({ status: 500, type: 'error', message: ['Error while processing your query'] });
      		}

      		member.password = hash;
      		member.save()
        		.then(user => {
         			return res.send({ status: 201, type: 'success', message: ['User created successfully. Now you can go to the login page'] });
        		})
        		.catch(err => {
          			return res.send({ status: 500, type: 'error', message: ['Error while processing your query'] });
        		}); 
    	});
  	},

  	async checkToken(req, res) {
		const token = req.cookies;

    	const auth = await jwt.verify(token.auth_token, process.env['JWT_HASH'], (err, decoded) => {
      		if (err) {
        		return res.send({ status: 401, type: 'error', message: 'Invalid JWT' });
      		}

      		return res.send({ status: 200, type: 'success', message: decoded.id });
    	});

    	return auth;
  	},

  	async logoutUser(req, res) {
		res.clearCookie('auth_token', { maxAge: 0, httpOnly: true });
		return res.send({ status: 200, type: 'success', message: ['User loged'] });
	},
}
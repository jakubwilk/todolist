const { body, validationResult } = require('express-validator')
const User = require('../models/user.model');

const userValidationRules = () => {
	return [
		body('email', 'Incorrect email address').isEmail().escape().trim(),
		body('description', 'Description field contains invalid characters').isString().escape().trim(),
		body('first_name', 'First name field contains invalid characters').isString().escape().trim(),
		body('last_name', 'Last name field contains invalid characters').isString().escape().trim()
  	]
}

module.exports = {
	userValidationRules,

  	async getUserData(req, res) {
    	const uid = req.params;
    
    	const user = await User.findById({ _id: uid.id });
    
    	if (user) {
      		return res.send({ status: 200, type: 'success', message: { username: user.email, avatar: user.avatar } });
    	}

    	return res.send({ status: 200, type: 'error', message: { username: 'No username' } });
  	},

	async getEditUser(req, res) {
		const uid = req.params;

		const user = await User.findById({ _id: uid.id });

		if (user) {
			return res.send({ status: 200, type: 'success', user });
		} else {
			return res.send({ status: 401, type: 'error', message: ['No user'] });
		}
	},

	async postEditUser(req, res) {
		const { email, description, first_name, last_name } = req.body;
		const path = 'uploads/';
		const filename = req.files === null ? null : Date.now() + '-' + req.files.file.name;
		const errors = validationResult(req);
		const errorsMessage = [];

    	if (!errors.isEmpty()) {
     		errors.array().map(error => errorsMessage.push(error.msg));
    	}

    	if (errorsMessage.length !== 0) {
      		return res.send({ status: 200, type: 'error', message: errorsMessage });
		}

		if (description.length > 300) {
			return res.send({ status: 200, type: 'error', message: ['Field description is too long (max. 300 characters)'] });
		}

		if (first_name.length > 60) {
			return res.send({ status: 200, type: 'error', message: ['Field first name is too long (max. 60 characters)'] });
		}

		if (last_name.length > 60) {
			return res.send({ status: 200, type: 'error', message: ['Field last name is too long (max. 60 characters)'] });
		}

		if (req.files !== null) {
			const file = req.files.file;

			if (file.mimetype !== 'image/jpeg') {
				return res.send({ status: 200, type: 'error', message: ['Unsupported file type. Only JPEG and PNG allowed'] });
			}

			if (file.size > 77000) {
				return res.send({ status: 200, type: 'error', message: ['File is too large'] });
			}

			file.mv(path + filename, (err) => {
				if (err) {
					return res.send({ status: 500, type: 'error', message: ['There was a problem. Please try it later'] });
				}
			});
		}

		const data = { 
			first_name: first_name, 
			last_name: last_name, 
			email: email, 
			description: description, 
			avatar: 'http://localhost:44912/' + path + filename 
		};

		const user = await User.findById({ _id: req.body.id });
		user.first_name = data.first_name;
		user.last_name = data.last_name;
		user.email = data.email;
		user.description = data.description;
		if (filename !== null) {
			user.avatar = data.avatar;
		}

		const query = user.save();

		if (!query) {
			return res.send({ status: 500, type: 'error', message: ['There was a problem. Please try it later'] });
		}

		return res.send({ status: 200, type: 'success', message: ['Profile updated'] });
	}
}
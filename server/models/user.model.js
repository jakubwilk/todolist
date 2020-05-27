const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	avatar: {
		type: String,
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

const User = mongoose.model('Users', userSchema);

module.exports = User;
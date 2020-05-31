const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	uid: {
		type: String,
	},
	finished: {
		type: Boolean,
	}
}, {
	timestamps: true,
});

const List = mongoose.model('Lists', listSchema);

module.exports = List;
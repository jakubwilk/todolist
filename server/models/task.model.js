const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	name: {
		type: String,
	},
	lid: {
		type: String,
	},
	finished: {
		type: Boolean,
	}
}, {
	timestamps: true,
});

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
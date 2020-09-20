const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tasks = new Schema({
	title:
		{
			type: String,
			required:true
		},
	completed: {
		type: Boolean,
		required: true,
		default: false
	}
})

module.exports = mongoose.model('tasks', tasks, 'tasks')
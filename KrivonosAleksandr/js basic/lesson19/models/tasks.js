const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tasksSchema = new Schema({
	text: {type: String, required:true},
	done: {type: Boolean, required: true, default: false}
})

module.exports = mongoose.model('tasks', tasksSchema, 'tasks')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tasksSchema = new Schema({
	taskname: {type: String, required: true},
	comment: {type: String},
	check: {type: Boolean, default: false},
	
})

module.exports = mongoose.model('Tasks', tasksSchema, 'tasks')
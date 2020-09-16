const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: false, default: false },
    date: { type: Date, required: false, default: new Date() }
})


module.exports = mongoose.model('tasks', taskSchema, 'tasks')




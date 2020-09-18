const { text } = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tasksSchema = new Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, default: false}
})

module.exports = mongoose.model('tasks', tasksSchema,'tasks')

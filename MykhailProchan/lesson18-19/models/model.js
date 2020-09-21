const { text } = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoList = new Schema({
  text: { type: String, required: true },
  checked: { type: Boolean, default: false }
}, { versionKey: false })

module.exports = mongoose.model('ToDoList', todoList, 'todocollection')
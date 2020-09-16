const mongoose = require('mongoose')


const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  commentary: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  }
})


module.exports = mongoose.model('Schema', Schema, 'schema')
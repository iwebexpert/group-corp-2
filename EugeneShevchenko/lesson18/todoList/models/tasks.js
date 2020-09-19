const {Schema, model} = require('mongoose')

const task = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  }
})

module.exports = model('Task', task)
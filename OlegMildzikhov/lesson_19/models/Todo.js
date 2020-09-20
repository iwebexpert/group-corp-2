const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', schema)
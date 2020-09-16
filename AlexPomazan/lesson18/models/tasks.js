const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tasksShema = new Schema({
    title: {
        type: String,
        required: true
    },
    performed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Tasks', tasksShema, 'tasks')
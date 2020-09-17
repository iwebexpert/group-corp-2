const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todosSchema = new Schema({
    label: {type: String, required: true},
    done: {type: Boolean, required: false, default: false},
    created: {
        type: Date,
        required: false,
        default: new Date()
    }
})

module.exports = mongoose.model('Todos', todosSchema, 'todos')
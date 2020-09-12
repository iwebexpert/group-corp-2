const {Schema, model} = require ('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    completed: {type: Boolean, required: true},
    date: {type: String, required: true},
    id: {type: String, required: true, unique: true}
})

module.exports = model('toDoItem', schema)

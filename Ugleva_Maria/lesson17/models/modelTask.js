const {Schema, model} = require('mongoose');

const schema = new Schema({
    // id будет создано само
    todoTitle: {
        type: String,
        // если заголовок не передан, то модель не создается
        required: true
    },
    completed: {
        type: Boolean,
        // значение по умолчанию
        default: false
    }
})

module.exports = model('Task', schema)
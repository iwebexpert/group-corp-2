const {Schema, model} = require('mongoose')

const schema = new Schema({
	title: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	}
})//Конфигурация для будущей модели

module.exports = model('Todo', schema, 'todos') //Регистрация модели схема, первое имя, второе по
// какой
// схеме сформировать модель
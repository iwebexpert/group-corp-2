const { Router } = require('express') //Подключение роутера для создания инстансов
const TodoModel = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
	const todos = await TodoModel.find({}).lean() //Взять все todos

	res.render('index', {
		title: 'Todos list',
		isIndex: true,
		todos
	})//Метод для отображение страницы
})

router.get('/create', (req, res) => {
	res.render('create', {
		title: 'Create todo',
		isCreate: true
	})
})

router.post('/create', async (req, res) => {
	const todo = new TodoModel({
		title: req.body.title
	})

	await todo.save()//Сохрание модели
	res.redirect('/')
})

router.post('/complete', async (req, res) => {
	const todo = await TodoModel.findById(req.body.id)
	todo.completed = !!req.body.completed
	await todo.save()
	res.redirect('/')
})

module.exports = router
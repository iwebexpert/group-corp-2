const {Router} = require('express')
const router = Router()
const tasksModel = require('../models/model')

router.get('/', async (req, res) => {
	const tasks = await tasksModel.find({}).lean()
	res.status(200).json(tasks)
})

router.post('/', async (req, res) => {
	const title = req.body.title
	if (!title) {
		res.status(400).json({
			error: 'Заполните пожалуйста форму'
		})
		return
	}
	const newTask = new tasksModel({title, completed: false})
	await newTask.save((err, task) => {
		if (err) {
			res.status(500).json({
				error: 'Произшла ошибка при сохранении формы'
			})
			return
		}
		res.status(200).json(task)
	})
})

router.delete('/', async (req, res) => {
	await tasksModel.findByIdAndDelete(req.body.id)
	res.redirect('/tasks')
})


router.patch('/:id', async (req, res) => {
	let id = req.params.id
	let tasks = await tasksModel.find({}).lean()

	await tasksModel.findByIdAndUpdate({_id: id}, {completed: !tasks.completed}, (err, task) => {
		if (err) {
			res.status(400).json({
				error: 'Такой задачи не существует',
				id
			})
			return
		}
		res.status(200).json(task)
	})
})

module.exports = router
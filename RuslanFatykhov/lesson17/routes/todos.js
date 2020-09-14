const express = require('express')
const router = express.Router()
const db = require('../public/db.js')

router.get('/', (req, res) => {
	res.json(db)
})

router.post('/', (req, res) => {

	const newTodo = {
		id: Math.random().toString(16).slice(2),
		title: req.body.title,
		info: req.body.info,
		date: new Date().toLocaleDateString()
	}

	db.push(newTodo)
	res.redirect('/')
})

router.post('/:id', (req, res) => {

	if (req.query.method == "delete") {

		if (db.some(task => task.id === req.params.id)) {
			db.forEach(el => {
				if (req.params.id == el.id) {
					db.splice(0, 1)
				}
			})
			res.redirect('/')
		}
	}
})

module.exports = router
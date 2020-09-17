const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
  const todos = await Todo.find({}).lean()

  res.render('index', {
    title: 'Todos list',
    isIndex: true,
    todos
  })
})

router.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    comments: req.body.comments,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  })

  await todo.save()
  res.redirect('/')
})

module.exports = router

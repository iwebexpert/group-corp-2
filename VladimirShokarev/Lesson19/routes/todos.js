const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()


router.get('/', async (req, res) => {
  const todos = await Todo.find({}).lean()

  res.status(200).json(todos)
})

router.post('/create', async (req, res) => {
  const title = req.body.title
    if (!title) {
        res.status(400).json({ error: 'Нет названия задачи' })
        return
    }

  const todo = new Todo({
    title: req.body.title,
    comments: req.body.comments,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  })

  await todo.save((err, doc) => {
    if (err) {
        res.status(500).json({ error: 'Не удалось сохранить новую задачу' })
        return
    }
    res.status(201).json(doc)
  })
})

router.delete("/delete/:id", async (req, res) => {
  const todos = await Todo.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
        res.status(500).json({ error: 'Не удалось удалить задачу'})
        return
    }
    res.json(doc)
})
})

module.exports = router

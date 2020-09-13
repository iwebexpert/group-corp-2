const {Router} = require('express')
const Task = require('../models/tasks')
const router = Router()

router.get('/', async (req, res) => {
  const tasks = await Task.getAll()
    res.render('done', {
      title: 'Список выполненных',
      isDone: true,
      tasks
    })
})

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  const task = await Task.getById(req.params.id)

  res.render('edit', {
    title: `Редактировать ${task.title}`,
    task
  })
})

router.post('/edit', async (req, res) => {
  await Task.update(req.body)

  res.redirect('/done')
})

router.get('/:id', async (req, res) => {
  const task = await Task.getById(req.params.id)
  res.render('task', {
    layout: 'empty',
    title: `Задача ${task.title}`,
    task
  })
})

module.exports = router
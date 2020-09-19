const {Router} = require('express')
const Task = require('../models/tasks')
const router = Router()

router.get('/', async (req, res) => {
  const tasks = await Task.find().lean()
    res.render('done', {
      title: 'Список дел',
      isDone: true,
      tasks
    })
})

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  const task = await Task.findById(req.params.id).lean()

  res.render('edit', {
    title: `Редактировать ${this.title}`,
    task
  })
})

router.post('/edit', async (req, res) => {
  const {id} = req.body
  delete req.body.id
  await Task.findByIdAndUpdate(id, req.body).lean()
  res.redirect('/done')
})

router.post('/remove', async (req, res) => {
  try {
    await Task.deleteOne({_id: req.body.id})
    res.redirect('/done')
  } catch(e) {
    console.log(e)
  }
})

router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id).lean()
  res.render('task', {
    layout: 'empty',
    title: `Задача ${task.title}`,
    task
  })
})

module.exports = router
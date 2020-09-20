const {Router} = require('express')
const Task = require('../model/tasks')
const { route } = require('./add')
const router = Router()

//функционал просмотра всех записей
router.get('/', async (req, res) => {
  const tasks = await Task.find().lean()
    res.status(200).json(tasks)
})

//функционал редактирования записи
router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.status(401).json({error: 'Невозможно попасть на страницу редактирования записи'})
  }
  const task = await Task.findById(req.params.id).lean()
  res.status(200).json(task)
})

router.post('/:id/edit', async (req, res) => {
    const id = req.body.id
    const {title, description} = req.body

    const task = await Task.findOneAndUpdate({_id: id},{$push: {task: {title, description}}}, {safe: true})
    res.status(200).json(task)
})

//http://localhost:3000/done/5f6528bc610c27c1b4b0253e/edit?allow=true

//фнукционал удаления записи
router.delete('/:id', async (req, res) => {
  try {
    await Task.deleteOne({_id: req.params.id})
  } catch(e) {
    res.status(500).json({error: 'Неудалось удалить запись'})
    return
  }
})

//функционал просмотра записи
router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id).lean()
  res.status(200).json(task)
})

module.exports = router
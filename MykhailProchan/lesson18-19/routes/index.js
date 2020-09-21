const express = require('express')
const router = express.Router()

const taskModel = require('../models/model')

router.get('/', async (req, res, next) => {
  res.json(await taskModel.find({}).lean()).status(200)
})

router.post('/', (req, res, next) => {
  if (req.body.text) {
    taskModel.create({ text: req.body.text })
      .then(el => {
        if (el.message) {
          res.json(el).status(500)
        } else {
          res.json(el).status(201)
        }
      })
  } else {
    res.json({ message: 'Request does not contain text' }).status(400)
  }
})

router.patch('/', (req, res, next) => {
  taskModel.updateOne({ _id: req.body.id }, { checked: req.body.checked })
    .then(el => {
      if (el.ok === 1) {
        res.json(el).status(200)
      } else {
        res.json({ message: 'Task has not been checked' })
      }
      next()
    })
})

router.delete('/', (req, res, next) => {
  taskModel.deleteOne({ _id: req.body.id })
    .then(el => {
      if (el.ok === 1) {
        res.json(el).status(200)
      } else {
        res.json({ message: 'Task was not deleted' }.status(500))
      }
      next()
    })
})

module.exports = router
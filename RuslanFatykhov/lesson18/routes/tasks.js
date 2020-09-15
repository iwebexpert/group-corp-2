const express = require('express')
const router = express.Router()
const Schema = require('../models/Schema')


router.get('/', async (req, res) => {
  const todos = await Schema.find({}).lean()
  res.render('tasks', {
    todos
  })
})

router.post('/create', async (req, res) => {
  if (req.body.title && req.body.commentary) {
    await new Schema({
      title: req.body.title,
      commentary: req.body.commentary,
      date: new Date().toLocaleString('ru', {
        weekday: "long",
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    }).save()
    res.redirect('/')
  } else {
    res.render('error')
  }

})

router.post('/complete', (req, res) => {
  const {
    id,
    completed
  } = req.body
  Schema.findById(id)
    .then(el => {
      el.completed = !!completed;
      el.save();
      res.redirect('/')
    })
})

router.post('/delete', (req, res) => {
  const {
    id
  } = req.body
  Schema.findByIdAndDelete(id)
    .then(
      res.redirect('/')
    )
})

module.exports = router
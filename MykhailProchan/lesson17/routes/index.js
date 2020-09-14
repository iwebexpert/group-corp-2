const express = require('express')
const router = express.Router()

let tasksList = require('./tasks')

router.get('/', (req, res, next) => {
  res.render('index', { tasksList })
})

router.post('/', (req, res, next) => {
  console.log('Добавлена задача ' + req.body.text);
  tasksList.push({ id: tasksList.length, text: req.body.text, checked: false })
  res.redirect('/')
})

router.patch('/', (req, res, next) => {
  tasksList[parseInt(req.body.id)].checked = req.body.checked
  console.log(`Задача ${parseInt(req.body.id)} выполнена = ${req.body.checked}`)
  res.send().status(200)
})

router.delete('/', (req, res, next) => {
  tasksList.splice(tasksList.findIndex(el => el.id === parseInt(req.body.id)), 1);
  res.send().status(200)
})

module.exports = router
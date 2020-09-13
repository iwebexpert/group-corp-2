const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')

const app = express()

const data = []
const completedTasks = []

app.engine('hbs', hbs())
app.set('views', './views')
app.set('view engine', 'hbs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static('public'))

app.get('/',  (req, res) => {
  res.render('layout', {
    layout: false,
    data: data,
    complete: completedTasks
  })
})

app.post('/',  (req, res) => {
  let todoContent = req.body.task
  data.push(todoContent)
  res.redirect('/')
})

app.get('/complete/:index', (req, res) => {
  let taskDone = data.splice(req.params.index, 1)
  completedTasks.push(taskDone)
  res.redirect('/')
})

app.get('*',(req, res) => {
  res.send('Page not found!')
})

app.listen(4000,  () => {
  console.log('Server started!')
  console.log('http://localhost/4000')
})

const express = require('express')
const port = 3000
const mongoose = require('mongoose')
const cors = require('cors')

const tasksModel = require('./models/tasks')

mongoose.connect('mongodb://root:2398@localhost:27017/todo?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const app = express()

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
app.use(cors())


app.get('/', async (req, res) => {
  const tasks = await tasksModel.find({}).lean()
  res.status(200).json(tasks)
})

app.post('/tasks', (req, res) => {
  const {
    title
  } = req.body
  if (!title) {
    res.status(400).json({
      error: 'Не передано название задачи'
    })
    return
  }
  const newTask = new tasksModel({
    title
  })
  newTask.save((err, doc) => {
    if (err) {
      res.status(500).json({
        error: 'Не удалось сохранить новую задачу'
      })
      return
    }
    res.status(201).json(doc)
  })
})

app.patch('/tasks/:id', async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).json({
      error: 'Не передан id задачи'
    })
    return
  }
  const tasks = await tasksModel.findById({
    _id: id
  }).lean()
  await tasksModel.findByIdAndUpdate({
    _id: id
  }, {
    performed: !tasks.performed
  }, (err, doc) => {
    if (err) {
      res.status(400).json({
        error: 'Не удалось изменить задачу',
        id
      })
      return
    }
    res.status(200).json(doc)
  })
})

app.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).json({
      error: 'Не передан id задачи'
    })
    return
  }
  await tasksModel.findByIdAndDelete({
    _id: id
  }, (err, doc) => {
    if (err) {
      res.status(500).json({
        error: 'Не удалось удалить задачу',
        id
      })
      return
    }
    res.status(200).json(doc)
  })
})

app.get('*', (req, res) => {
  res.status(404).json({
    'message': 'Такой страницы не существует'
  })
})

app.listen(port, () => {
  console.log('Server started!')
  console.log(`http://localhost:${port}`)
})
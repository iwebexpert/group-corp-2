const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb://root:1234@localhost:27017/tasks?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const tasksModels = require('./models/todos')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.status(200).json( {'message': 'Tasks are available on the address: /tasks'} )
})

app.get('/tasks', async (req, res) => {
  const tasks = await tasksModels.find({}).lean()
  res.status(200).json(tasks)
})

app.post('/tasks', (req, res) => {
  const { title } = req.body
  if (!title) {
    res.status(400).json('Error: title expected')
    return
  }
  const newTask = new tasksModels({ title })

  newTask.save((err, doc) => {
    if (err) {
      res.status(500).json('Error: failed to save data to database')
      return
    }
    res.status(200).json(doc)
  })
})

app.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).json({error: 'Error: id of the task expected', id})
    return
  }

  await tasksModels.findByIdAndRemove({ _id: id }, (err, doc) => {
    if (err) {
      res.status(400).json({ error: err })
    }
    res.json(doc)
  })
})

app.patch('/tasks/:id', async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).json({error: 'Error: id of the task expected', id})
    return
  }

  await tasksModels.findById({ _id: id }).lean()
      .then(res => res.completed)
      .then(async (completed) => {
        await tasksModels.findByIdAndUpdate({ _id: id }, { completed: !completed }, (err, doc) => {
          if (err) {
            res.status(400).json({ error: err })
            return
          }
          res.json(doc)
        })
      })
})

app.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const task = await tasksModels.findById({_id: taskId}).lean()

  res.status(200).json(task)
})

app.get('*', (req, res) => {
  res.status(404).json({'message': 'Page not found'})
})

app.listen(4000, () => {
  console.log('Server is running!')
  console.log('http://localhost:4000/')
})



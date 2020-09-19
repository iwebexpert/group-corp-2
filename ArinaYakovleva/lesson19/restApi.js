const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://root:12345@localhost:27017/tasks?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const app = express()

//Models
const tasksModels = require('./models/tasks')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).json( {'message': 'Tasks are available on the adress: /tasks'} )
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
    let id = req.params.id
    if (!id) {
        res.status(400).json({error: 'Error: id of the task expected', id})
        return
    }
    const task = await tasksModels.findByIdAndRemove({ _id: id }, (err, doc) => {
        if (err) {
            res.status(400).json({ error: err })
        }
        res.json(doc)
    })
})

app.patch('/tasks/:id', async (req, res) => {
    let id = req.params.id
    if (!id) {
        res.redirect('/tasks')
    }
    const doneTask = await tasksModels.findById({ _id: id }).lean()
        .then(res => res.completed)
        .then(async (completed) => {
            const task = await tasksModels.findByIdAndUpdate({ _id: id }, { completed: !completed }, (err, doc) => {
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

app.listen(2000, () => {
    console.log('Server is running')
    console.log('http://localhost:2000/')
})






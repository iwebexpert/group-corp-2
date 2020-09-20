const express = require('express')
const mongoose = require('mongoose')
const todosModel = require('./models/todos')

mongoose.connect('mongodb://root:1234@localhost:27017/todo-list?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'Chats are available: /todos'})
})

app.get('/todos', async (req, res) => {
    const todos = await todosModel.find({}).lean()
    res.status(200).json(todos)
})

app.post('/todos', async (req, res) => {
    const title = req.body.title
    if(!title){
        res.status(400).json({error: 'Необходимо передать название задачи'})
        return
    }
    const newTodo = new todosModel({title})
    newTodo.save((err, doc) => {
        if(err){
            res.status(500).json({error: 'Saving to db failure'})
            return
        }
        res.status(200).json(doc)
    })
})

app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id

    if(!id){
        res.status(400).json({error: 'No id was given', id})
        return
    }

    const todo = await todosModel.findByIdAndRemove(id, (err, doc) => {
        if(err){
            res.status(400).json({error: 'Not able to delete the task', id})
            return
        }
        res.json(doc)
    })
})

app.patch('/tasks/:id/:completed', async (req, res) => {
    const id = req.params.id
    const completed = req.params.completed === "true"

    if(!id){
        res.status(400).json({error: 'No id was given', id})
        return
    }

    const task = await tasksModel.findByIdAndUpdate(id, {completed: !completed}, (err, doc) => {
        if(err){
            res.status(400).json({error: 'Not able to update task status', id})
            return
        }
        res.json(doc)
    })
})

app.get('*', (req, res) => {
    res.status(404).json({'message': 'Page not found'})
})

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000!')
})
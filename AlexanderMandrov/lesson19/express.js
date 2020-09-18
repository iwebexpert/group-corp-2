const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const todosModel = require('./models/todos')

mongoose.connect('mongodb://root:password@localhost:27017/messenger?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).json({ message: "Todos available on: /todo" })
})

app.get('/todo', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
    const todos = await todosModel.find({}).lean()
    res.status(200).json(todos)
})

app.get('/todo/:id', async (req, res) => {
    
    const id = req.params.id 
    const todo = await todosModel.findById({_id: id}).lean()
    res.status(200).json(todo)
})

app.post('/todo', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
    const { label } = req.body
    if (!label) {
        res.status(400).json({ error: "You should input todo's label" })
        return
    }
    const newTodo = new todosModel({ label })
    newTodo.save((err, doc) => {
        if (err) {
            res.status(500).json({ error: "Can't save data" })
            return
        }
        res.status(200).json(doc)
    })
})

app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id
    const todo = await todosModel.findByIdAndRemove({_id: id}, (err, doc) => {
        if (err) {
            res.status(400).json({error: err})
            return
        }
        res.json(doc)
    })
})

app.patch('/todo/:id', async (req, res) => {
    const id = req.params.id
    const done = await todosModel.findById({_id: id}).lean()
    .then(res => res.done)
    .then(async (done) => {
        const todo = await todosModel.findByIdAndUpdate({_id: id}, {done: !done}, (err, doc) => {
            if (err) {
                res.status(400).json({error: err})
                return
            }
            res.json(doc)
        })
    })
})

app.get('*', (req, res) => {
    res.status(404).json({message: "Page not found"})
})

app.listen(4000, () => {
    console.log('Server started!')
    console.log('http://localhost:4000')
})
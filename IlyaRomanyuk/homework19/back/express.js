const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const model = require('./models/todos')
const cors = require('cors')

mongoose.connect('mongodb+srv://Ilya:MpBd1942@chats.sbg2t.mongodb.net/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))


app.get('/', async (req, res) => {
    let todos = await model.find({}).lean()
    res.status(200).json(todos)
})

app.post('/todos', (req, res) => {
    const { title } = req.body
    let newTask = new model({ title })
    newTask.save((err, doc) => {
        if (err) return
        res.status(200).json(doc)
    })
})

app.delete('/todos/:id', async (req, res) => {
    let { id } = req.params
    if (!id) {
        res.status(400).json({ error: 'Не удалось удалить элемент' })
        return
    }

    await model.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            res.status(400).json({ error: 'Ошибка, не удалось удалить задачу', id })
            return
        }
        res.status(200).json(doc)
    })
})

app.delete('/deleteAll', async (req, res) => {
    await model.deleteMany({}, (err, doc) => {
        if (err) {
            res.status(400).json({ error: 'Ошибка, не удалось удалить все элементы' })
            return
        }
        res.status(200).json(doc)
    })
})

app.patch('/todos/:id', async (req, res) => {
    let { id } = req.params
    if (!id) {
        res.status(400).json({ error: 'Не удалось обновить элемент' })
        return
    }
    let todo = await model.findById({ _id: id }).lean()
    await model.findByIdAndUpdate(id, { completed: !todo.completed }, (err, doc) => {
        if (err) {
            res.status(400).json({ error: 'Ошибка, не удалось изменить задачу', id })
            return
        }
        res.status(200).json(doc)
    })
})

app.get('/todo/:id', async (req, res) => {
    const id = (req.params.id) ? req.params.id : null
    const todo = await model.findById({ _id: id }).lean()
    res.status(200).json(todo)
})

//Errors
app.get('*', (req, res) => {
    res.status(404).json({ error: 'Не удалось найти страницу по указанному пути' })
})

app.listen(3030, () => {
    console.log('Server started on port 3030')
})
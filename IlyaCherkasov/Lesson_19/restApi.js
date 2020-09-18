const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Models
const todoListModel = require('./models/todoLists')

mongoose.connect('mongodb://root:1234@localhost:27017/todo?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

//Редирект с пустой страницы
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Чаты доступны по адресу: /todo' })
})

//Получение данных с базы и рендер
app.get('/todo', async (req, res) => {
    const todo = await todoListModel.find({}).lean()
    res.status(200).json(todo)
})

//Добавление новой задачи (при помощи js)
app.post('/todo', (req, res) => {
    const title = req.body.title;
    const comments = req.body.comments;
    if (!title && !comments) {
        res.status(400).json({ error: 'Необходимо заполнить поля' })
        return;
    }

    const newMessage = new todoListModel({ title, comments })
    newMessage.save((err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Неудалось сохранить данные на сервер' })
            return
        }
        res.status(200).json(doc)
    })
})

//Удаление задачи (при помощи js)
app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).json({ error: 'Не передан id задачи', id })
        return
    }

    await todoListModel.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить задачу', id })
            return
        }
        res.json(doc)
    })
})

//Ошибки
app.get('*', (req, res) => {
    res.status(404).json({ 'message': 'Страница не найдена' })
})

app.listen(4000, () => {
    console.log('Serverstarted! http://localhost:4000')
}) 
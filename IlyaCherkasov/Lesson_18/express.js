const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

const users = require('./helpers/users')

//Models
const todoListModel = require('./models/todoLists')

mongoose.connect('mongodb://root:1234@localhost:27017/todo?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const app = express()

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
}))

app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())

//Редирект с пустой страницы
app.get('/', (req, res) => {
    res.redirect('/users')
})

//Получение данных с базы и рендер
app.get('/users', async (req, res) => {
    const users = await todoListModel.find({}).lean()
    res.render('users', { layout: 'default', users })
})

//Добавление новой задачи
app.post('/users', async (req, res) => {
    const title = req.body.title;
    const comments = req.body.comments;
    if (!title && !comments) {
        res.redirect('/users');
        return;
    }

    const newMessage = new todoListModel({ title, comments })
    newMessage.save((err, doc) => {
        if (err) {
            console.error(err)
            return
        }
        res.redirect('/users');
    })
})

//Удаление задачи
app.delete('/users/:id', async (req, res) => {
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

app.listen(4000, () => {
    console.log('Serverstarted! http://localhost:4000')
}) 
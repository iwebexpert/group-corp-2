const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const model = require('./models/todos')
const usersModel = require('./models/users')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const TOKEN_SECRET_KEY = 'dfhidusfhyiudayfidayfihvkcxvuydsf'

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


//JWT
const checkAuthentication = (req, res, next) => {
    if (req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ')

        jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(403).json({ 'message': 'Пользователь не авторизован (verify)' })
                return
            }

            req.user = decoded

            next()
        })
    } else {
        res.status(403).json({ 'message': 'Пользователь не авторизован' })
    }
}

//Доспуп
app.use('/chats', checkAuthentication)

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

app.post('/register', async (req, res) => {
    const { email, name, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Не передан email или password' })
        return
    }

    const user = new usersModel({ email, name, password })
    await user.save()
    res.status(201).json(user)
})

app.post('/auth', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Не передан email или password' })
        return
    }

    const user = await usersModel.findOne({ email })
    if (!user) {
        res.status(401).json({ message: 'Пользователь не найден' })
        return
    }

    if (!user.validatePassword(password)) {
        res.status(401).json({ message: 'Неправильный логин/пароль' })
        return
    }

    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password

    res.status(201).json({
        ...plainUser,
        token: jwt.sign(plainUser, TOKEN_SECRET_KEY)
    })
})

//Errors
app.get('*', (req, res) => {
    res.status(404).json({ error: 'Не удалось найти страницу по указанному пути' })
})

app.listen(3030, () => {
    console.log('Server started on port 3030')
})
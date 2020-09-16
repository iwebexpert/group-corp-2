const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const port = 3000
const mongoose = require('mongoose')
const tasksModel = require('./models/tasks')

mongoose.connect('mongodb://root:2398@localhost:27017/todo?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const app = express()


app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs')
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(express.static('public'))


app.get('/', async (req, res) => {
    const tasks = await tasksModel.find({}).lean()
    res.render('tasks', {
        layout: 'default',
        tasks
    })
})

app.post('/tasks', (req, res) => {
    const {
        title
    } = req.body
    const newTask = new tasksModel({
        title
    })
    newTask.save((err, doc) => {
        if (err) return
        res.redirect('/')
    })
})

app.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.redirect('/')
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
                error: 'Error, could not change task',
                id
            })
            return
        }
        res.json(doc)
    })
})

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.redirect('/')
        return
    }
    await tasksModel.findByIdAndDelete({
        _id: id
    }, (err, doc) => {
        if (err) {
            res.status(400).json({
                error: 'Error, could not delete task',
                id
            })
            return
        }
        res.json(doc)
    })
})

app.get('*', (req, res) => {
    res.status(404).render('error', {
        layout: 'default'
    })
})

app.listen(port, () => {
    console.log('Server started!')
    console.log(`http://localhost:${port}`)
})
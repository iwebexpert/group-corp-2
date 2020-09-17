const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
// let tasks = require('./helpers/tasks')
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


app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/tasks')
})
app.get('/tasks', async (req, res) => {
    const tasks = await tasksModels.find({}).lean()

    res.render('tasks', { layout: 'default', tasks })
})

app.post('/tasks', (req, res) => {
    const { title } = req.body
    if (!title) {
        res.redirect('/')
        return
    }
    const newTask = new tasksModels({ title })

    newTask.save((err, doc) => {
        if (err) {
            console.log(err);
            return
        }
        res.redirect('/tasks')
    })
})

app.delete('/tasks/:id', async (req, res) => {
    let id = req.params.id
    if (!id) {
        res.redirect('/tasks')
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
        .then(res => res.done)
        .then(async (done) => {
            const task = await tasksModels.findByIdAndUpdate({ _id: id }, { completed: !completed }, (err, doc) => {
                if (err) {
                    res.status(400).json({ error: err })
                    return
                }
                res.json(doc)
            })
        })
})

app.get('/task/:id', async (req, res) => {
    const id = (req.params.id) ? req.params.id : null
    const task = await tasksModels.findById({ _id: id }).lean()

    res.render('task', { layout: 'default', task })
})

app.get('*', (req, res) => {
    res.status(404).render('error', { layout: 'default' })
})

app.listen(8000, () => {
    console.log('Server is running')
    console.log('http://localhost:8000/')
})






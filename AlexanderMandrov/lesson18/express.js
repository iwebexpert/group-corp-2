const express = require('./node_modules/express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

const todosModel = require('./models/todos')

mongoose.connect('mongodb://root:password@localhost:27017/messenger?authSource=admin', {
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
    partialsDir: path.join(__dirname, 'views', 'partials')
}))

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/todo')
})

app.get('/todo', async (req, res) => {
    const todos = await todosModel.find({}).lean()
    res.render('todo', { layout: 'default', todos })
})

app.post('/todo', (req, res) => {
    const { label } = req.body
    if (!label) {
        res.redirect('/todo')
        return
    }
    const newTodo = new todosModel({ label })
    newTodo.save((err, doc) => {
        if (err) {
            console.error(err)
            return
        }
        res.redirect('/todo')
    })
})

app.delete('/todo/:id', async (req, res) => {
    let id = req.params.id
    if (!id) {
        res.redirect('/todo')
        return
    }
    const todo = await todosModel.findByIdAndRemove({_id: id}, (err, doc) => {
        if (err) {
            res.status(400).json({error: err})
            return
        }
        res.json(doc)
    })
})

app.patch('/todo/:id', async (req, res) => {
    let id = req.params.id
    if (!id) {
        res.redirect('/todo')
        return
    }
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

app.get('/todo/:id', async (req, res) => {
    const id = req.params.id 
    if (!id) {
        res.redirect('/todo')
        return
    }
    const todo = await todosModel.findById({_id: id}).lean()
    res.render('todoItem', { layout: 'default', todo })
})

app.get('*', (req, res) => {
    res.status(404).render('error', { layout: 'default' })
})

app.listen(4000, () => {
    console.log('Server started!')
    console.log('http://localhost:4000')
})
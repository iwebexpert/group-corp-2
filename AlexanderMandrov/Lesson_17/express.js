const express = require('./node_modules/express')
const hbs = require('express-handlebars')
const path = require('path')

let todos = require('./helpers/todos')

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

app.get('/todo', (req, res) => {
    res.render('todo', { layout: 'default', todos })
})

app.post('/todo', (req, res) => {
    const { label } = req.body
    for (let i = 0; i < todos.length; i++) {
        todos[i].id = i
    }
    if (label) {
        todos.push({
            id: todos.length,
            label,
            done: false,
        })
    }
    res.render('todo', { layout: 'default', todos })
})

app.get('/todo/:id', (req, res) => {
    const id = (req.params.id) ? req.params.id : null
    const todo = todos[id]

    res.render('todoItem', { layout: 'default', todo })
})

app.delete('/todo/:id', (req, res) => {
    let id = req.params.id
    todos = todos.filter((item) => item.id !== +id)
    res.render('todo', { layout: 'default', todos })
})

app.patch('/todo/:id', (req, res) => {
    let id = req.params.id
    todos = todos.map(todo => {
        if (todo.id == id) {
            todo.done = !todo.done
            return todo
        } else {
            return todo
        }
    })
    res.render('todo', { layout: 'default', todos })
})

app.get('*', (req, res) => {
    res.status(404).render('error', { layout: 'default' })
})

app.listen(4000, () => {
    console.log('Server started!')
    console.log('http://localhost:4000')
})
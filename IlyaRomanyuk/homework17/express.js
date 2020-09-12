const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

let todos = require('./helpers/todos')
const app = express()

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
    res.render('todos', { layout: 'default', todos })
})

app.post('/todos', (req, res) => {
    const { title } = req.body
    for (let i = 0; i < todos.length; i++) {
        todos[i].id = i
    }
    let newTask = {
        id: todos.length,
        title,
        completed: false,
        time: new Date().toLocaleString()
    }
    todos.push(newTask)
    console.log(todos)
    res.redirect('/')
})

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id
    todos = todos.filter((item) => item.id !== parseInt(id))
    res.render('todos', { layout: 'default', todos })
})

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id
    todos = todos.map(element => {
        if (element.id == id) {
            element.completed = !element.completed
            return element
        } else {
            return element
        }
    })
    console.log(todos)
    res.render('todos', { layout: 'default', todos })
})

app.get('/todo/:id', (req, res) => {
    const id = (req.params.id) ? req.params.id : null
    const todo = todos[id]

    res.render('todo', { layout: 'default', todo })
})

//Errors
app.get('*', (req, res) => {
    res.status(404).render('error', { layout: 'default' })
})

app.listen(3030, () => {
    console.log('Server started on port 3030')
})
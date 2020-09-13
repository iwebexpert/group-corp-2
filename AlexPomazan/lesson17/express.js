const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const port = 3000

let tasks = require('./helpers/tasks')
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


app.get('/', (req, res) => {
    res.render('tasks', {
        layout: 'default',
        tasks
    })
})

app.post('/tasks', (req, res) => {
    const {
        title
    } = req.body
    if (title) {
        tasks.push({
            id: tasks.length,
            title,
            performed: false,
        })
    }
    res.redirect('/')
})

app.patch('/tasks/:id', (req, res) => {
    let id = req.params.id
    tasks = tasks.map(element => {
        if (element.id == id) {
            element.performed = !element.performed
            return element
        } else {
            return element
        }
    })
    res.render('tasks', {
        layout: 'default',
        tasks
    })
})

app.delete('/tasks/:id', (req, res) => {
    let id = req.params.id
    tasks = tasks.filter((item) => item.id !== parseInt(id))
    res.render('tasks', {
        layout: 'default',
        tasks
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
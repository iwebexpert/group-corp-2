const express = require('express')
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const path = require('path')

let tasks = require('./helpers/tasks')

const app = express()

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/tasks')
})

app.get('/tasks', (req, res) => {
    res.render('tasks', {layout: 'default', tasks})
})

app.post('/add', (req, res) => {
    const {text} = req.body
    if(text){
        tasks.push({
            id: tasks.length,
            text,
            done: false
        })
    }
    res.redirect('/tasks')
})

app.post('/delete', (req, res) => {

    tasks.forEach((item, i) => {
        if(item.done === true) {
            tasks.splice(i, 1)
        }
    })
    res.redirect('/tasks')
})

app.post('/deleteAll', (req, res) => {
    tasks.splice(0)
    res.redirect('/tasks')
})

app.patch('/tasks/:id', (req, res) => {
    const id = req.params.id
    tasks.forEach(item => {
        if(item.id === parseInt(id)) {
            item.done = !item.done
        }
    })

    res.render('tasks', {layout: 'default', tasks})
})

app.get('*', (req, res) => {
    res.status(404).render('error', {layout: 'default'})
})

app.listen(4000, () => {
    console.log('Serverstarted!')
    console.log('http://localhost:4000')
})
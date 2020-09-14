const express = require('express')
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const path = require('path')

// подключаем из папки helpers данные
const tasks = require('./helpers/tasks')


const app = express()
// настройка шаблонов
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    // папка к шаблонам
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    // папка к частям шаблонов
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))
// запускаем движок
app.set('view engine', 'hbs')
// Работа с формами
app.use(express.urlencoded({extended: false}))
// Добавление данных из json
app.use(express.json())
// app.use(cookieParser())
app.use(express.static('public'))

// перенаправляет
app.get('/', (req, res) => {
    res.redirect('/tasks')
})


app.get('/tasks', (req, res) => {
    console.log(tasks)
    // отрисовка default, в котором body=tasks.hbs + передача данных(tasks)
    res.render('tasks', {layout: 'default', tasks})
})

app.post('/tasks', (req, res) => {
    const {taskname, comment} = req.body
    const length = Object.keys(tasks).length
    // без проверки tasks[length - 1].taskname != taskname, после перезагрузки страницы последняя добавленная задача будет постоянно вставляться
    // И проверяю длину, иначе если tasks пустой, будет ошибка - 'taskname' of undefined
    if((length && tasks[length - 1].taskname != taskname) || !length){
        tasks[length] = {
            taskname,
            comment,
        }
    }
    res.redirect('/tasks')
})

app.patch('/tasks/:id', (req, res) => {

    const {check} = req.body
    const task = tasks[req.params.id]
    task.check = check
})

app.delete('/tasks/:id', (req, res) => {

    delete tasks[req.params.id]
    res.render('tasks', {layout: 'default', tasks})
})

// Теперь при нажатии на пользователя, ключ придет в req.params(из-за :taskname)
app.get('/tasks/:taskname', (req, res) => {

    const taskname = (req.params.taskname) ? req.params.taskname : null
    const task = tasks[taskname]

    res.render('task', {layout: 'default', task})
})


//Errors
app.get('*', (req, res) => {
    // res.send('Page not found!!!')
    res.status(404).render('error', {layout: 'default'})
})

app.listen(4000, () => {
    console.log('Serverstarted!')
    console.log('http://localhost:4000')
})
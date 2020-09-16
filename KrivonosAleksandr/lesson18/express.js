const express = require('express')
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')

//Models
const tasksModel = require('./models/tasks')

mongoose.connect('mongodb+srv://tiSai:1234@cluster0.mxztp.mongodb.net/toDoList', {
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

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/tasks')
})

app.get('/tasks', async (req, res) => {
    const tasks = await tasksModel.find({}).lean()
    res.render('tasks', {layout: 'default', tasks})
})

app.post('/add', (req, res) => {
    const {text} = req.body
    if(!text){
        res.redirect('/tasks')
        return
    }
    const newTask = new tasksModel({text, done: false})
    newTask.save((err, doc) => {
        if(err){
            console.error(err)
            return
        }
        res.redirect('/tasks')
    })
})

app.post('/delete', async (req, res) => {
    const tasks = await tasksModel.find({}).lean()
    for (let i = 0; i < tasks.length; i++){
        if(tasks[i].done === true) {
            let id = tasks[i]._id
            await tasksModel.findByIdAndRemove(id, (err, doc) => {
                if (err) {
                    res.status(400).json({error: 'Не удалось удалить задачу', id})
                    return
                }
            })
        }
    }
    res.redirect('/tasks')
})

app.post('/deleteAll', async(req, res) => {
    const tasks = await tasksModel.find({}).lean()
    for (let i = 0; i < tasks.length; i++){
        await tasksModel.findByIdAndRemove({_id:tasks[i]._id}, (err, doc) => {
            if (err) {
                res.status(400).json({error: 'Не удалось удалить задачу', i})
                return
            }
        })
    }

    res.redirect('/tasks')
})

app.patch('/tasks/:id', async (req, res) => {
    let id = req.params.id
    let tasks = await tasksModel.find({}).lean()

    let task = await tasksModel.findByIdAndUpdate({_id:id}, {done: !tasks.done}, (err, doc) => {
        if (err) {
            res.status(400).json({error: 'Не удалось удалить задачу', id})
            return
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
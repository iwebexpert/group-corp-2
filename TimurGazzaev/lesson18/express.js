const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

const tasksModel = require('./models/tasks')

mongoose.connect('mongodb://root:1234@localhost:27017/todo-list?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const newTask1 = new tasksModel({title: "Просмотреть курс по HTML/CSS", completed: true})
const newTask2 = new tasksModel({title: "Разобраться с Git"})
const newTask3 = new tasksModel({title: "Изучить JavaScript", completed: true})
const newTask4 = new tasksModel({title: "Почитать про React"})
newTask1.save()
newTask2.save()
newTask3.save()
newTask4.save()

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

app.post('/tasks', async (req, res) => {
    const title = req.body.title
    if(!title){
        res.redirect('/tasks')
        return
    }

    const newTask = new tasksModel({title})
    newTask.save((err, doc) => {
        if(err){
            console.error(err)
            return
        }
        res.redirect('/tasks')
    })
})

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id

    if(!id){
        res.status(400).json({error: 'Не передан идентификатор задачи', id})
        return
    }

    const task = await tasksModel.findByIdAndRemove(id, (err, doc) => {
        if(err){
            res.status(400).json({error: 'Не удалось удалить задачу', id})
            return
        }
        res.json(doc)
    })
})

app.patch('/tasks/:id/:completed', async (req, res) => {
    const id = req.params.id
    const completed = req.params.completed === "true"
    if(!id){
        res.status(400).json({error: 'Не передан идентификатор задачи', id})
        return
    }

    const task = await tasksModel.findByIdAndUpdate(id, {completed: !completed}, (err, doc) => {
        if(err){
            res.status(400).json({error: 'Не удалось обновить статус задачи', id})
            return
        }
        res.json(doc)
    })
})

app.get('*', (req, res) => {
    res.status(404).render('error', {layout: 'default'})
})

app.listen(4000, () => {
    console.log('Serverstarted!')
    console.log('http://localhost:4000')
})

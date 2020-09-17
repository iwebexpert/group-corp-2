const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const tasksModel = require('./models/tasks')

mongoose.connect('mongodb://root:1234@localhost:27017/todo-list?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

/* Заполнение БД задачами
const newTask1 = new tasksModel({title: "Просмотреть курс по HTML/CSS", completed: true})
const newTask2 = new tasksModel({title: "Разобраться с Git"})
const newTask3 = new tasksModel({title: "Изучить JavaScript", completed: true})
const newTask4 = new tasksModel({title: "Почитать про React"})
newTask1.save()
newTask2.save()
newTask3.save()
newTask4.save()*/

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'Чаты доступны по адресу: /tasks'})
})

app.get('/tasks', async (req, res) => {
    const tasks = await tasksModel.find({}).lean()
    res.status(200).json(tasks)
})

app.post('/tasks', async (req, res) => {
    const title = req.body.title
    if(!title){
        res.status(400).json({error: 'Необходимо передать название задачи'})
        return
    }

    const newTask = new tasksModel({title})
    newTask.save((err, doc) => {
        if(err){
            res.status(500).json({error: 'Не удалось сохранить данные в БД'})
            return
        }
        res.status(200).json(doc)
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
    res.status(404).json({'message': 'Page not found'})
})

app.listen(4000, () => {
    console.log('Serverstarted!')
    console.log('http://localhost:4000')
})

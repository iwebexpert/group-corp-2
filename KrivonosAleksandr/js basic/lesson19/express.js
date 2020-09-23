const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')

//Models
const tasksModel = require('./models/tasks')

mongoose.connect('//your link to db', {
useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Задачи доступны по адресу: /tasks'})
})

app.get('/tasks', async (req, res) => {
    const tasks = await tasksModel.find({}).lean()
    res.status(200).json(tasks)
})

app.post('/tasks', (req, res) => {
    const text = req.body.text
    if(!text){
        res.status(400).json({error: 'Необходимо передать текст задачи (text)'})
        return
    }
    const newTask = new tasksModel({text, done: false})
    newTask.save((err, doc) => {
        if(err){
            res.status(500).json({error: 'Не удалось сохранить данные в БД'})
            return
        }
        res.status(200).json(doc)
    })
})

app.delete('/tasks', async (req, res) => {
    const tasks = await tasksModel.find({}).lean()
    for (let i = 0; i < tasks.length; i++){
        if(tasks[i].done === true) {
            let id = tasks[i]._id
            await tasksModel.findByIdAndRemove(id, (err, doc) => {
                if (err) {
                    res.status(400).json({error: 'Не удалось удалить задачу', id})
                    return
                }
                if(i === tasks.length - 1)
                    res.status(200).json(doc)
            })
        }
    }
})

app.post('/delete', async(req, res) => {
    const tasks = await tasksModel.find({}).lean()
    await tasksModel.remove({}, (err, doc) => {
        if (err) {
            res.status(400).json({error: 'Не удалось удалить задачу', i})
            return
        }
        res.status(200).json(doc)
    })
})

app.patch('/tasks/:id', async (req, res) => {
    let id = req.params.id
    let tasks = await tasksModel.find({}).lean()

    let task = await tasksModel.findByIdAndUpdate({_id:id}, {done: !tasks.done}, (err, doc) => {
        if (err) {
            res.status(400).json({error: 'Не удалось удалить задачу', id})
            return
        }
        res.status(200).json(doc)
    })
})

app.get('*', (req, res) => {
    res.status(404).json({error: 'Ошибка. Данной странички не существует'})
})

app.listen(4000, () => {
    console.log('Serverstarted!')
    console.log('http://localhost:4000')
})
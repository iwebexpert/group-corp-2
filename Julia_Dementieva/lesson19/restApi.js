const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')

const tasksModel = require('./models/tasks')

mongoose.connect('mongodb+srv://DemJul:d1e2m3jul@cluster0.ond2i.gcp.mongodb.net/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const app = express()

app.use(express.urlencoded({extended: false}))

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({message: 'Задачи доступны по адресу: /tasks'})
})


app.get('/tasks', async (req, res) => {
    const tasks = await tasksModel.find({}).lean()
    res.status(200).json(tasks)
})

app.post('/tasks', async (req, res) => {
    let {taskname, comment} = req.body
    if(!taskname){
        res.status(400).json({error: 'Отсутствует название задачи'})
        return
    }
    if(!comment){
        comment = 'Комментарий отсутствует'
    }
    const newTask = new tasksModel({taskname, comment, check: "false"})
    newTask.save((err, doc) => {
        if(err){
            res.status(500).json({error: 'Ошибка при сохранении'})
            return
        }
        res.status(200).json(doc)
        
    })

})


app.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const {check} = req.body
    const task = await tasksModel.findByIdAndUpdate(id, {$set:{check: check}}, (err, cur)=>{
        if(err){
            res.status(400).json({error: 'Не удалось изменить статус', id})
            return
        }
        res.status(200).json(cur)
    })
})

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id
    
    if(!id){
        res.status(400).json({error: 'Идентификатор не верен', id})
        return
    }

    const task = await tasksModel.findByIdAndRemove(id, (err, doc) => {
        if(err){
            res.status(400).json({error: 'Удаление - ошибка', id})
            return
        }
        res.json(doc)
    })
})

app.get('/tasks/:id', async (req, res) => {

    const taskId = req.params.id
    const task = await tasksModel.findById({_id: taskId}).lean()
    res.status(200).json(task)
})


//Errors
app.get('*', (req, res) => {
    res.status(404).json({'error': 'Page not found'})
})

app.listen(4000, () => {
    console.log('Serverstarted!')
    console.log('http://localhost:4000')
})
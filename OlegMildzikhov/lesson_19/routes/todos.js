const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Задачи доступны по адресу: /tasks' })
})

router.get('/tasks', async(req, res) => {
    const todos = await Todo.find({})
    res.status(200).json(todos)
})

router.get('/tasks/inprogress', async(req, res) => {
    const todosInProg = await Todo.find({ completed: false })
    res.status(200).json(todosInProg)
})

router.get('/tasks/done', async(req, res) => {
    const todosDone = await Todo.find({ completed: true })
    res.status(200).json(todosDone)
})

router.get('/tasks/:id', async(req, res) => {
    const taskId = req.params.id
    const task = await Todo.findById({ _id: taskId })
    res.status(200).json(task)
})

router.post('/tasks', async(req, res) => {
    const title = req.body.title;
    if (!title) {
        console.log(req.body.title)
        res.status(400).json({ error: 'Необходимо передать title' })
        return
    }

    const newTask = new Todo({
        title,
        descr: "test descr"
    })
    newTask.save((err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Не удалось сохранить данные в БД' })
            return
        }
        res.status(200).json(doc)
    })
})

router.delete('/tasks/:id', async(req, res) => {
        const taskId = req.params.id

        if (!taskId) {
            res.status(400).json({ error: 'Не передан идентификатор задачи', taskId })
        }

        const task = await Todo.findByIdAndRemove(taskId, (err, doc) => {
            if (err) {
                res.status(400).json({ error: 'не удалось удалить задачу', taskId })
                return
            }
            res.json(doc)
        })
    })
    //изменение статуса задачи, которая в процессе выполнения
router.post('/tasks/inprogress/:id', async(req, res) => {
        const taskId = req.params.id
        const { completed } = req.body

        if (!completed) {
            res.status(400).json({ message: 'Не передан статус задачи(completed)' })
            return
        }

        Todo.findOneAndUpdate({ _id: taskId }, {
                completed: completed
            }, { safe: true, upsert: true }, //default: safe: true, upsert: false
            (err, doc) => {
                if (err) {
                    res.status(500).json({ error: 'Не удалось сохранить сообщение в БД' })
                    return
                }

                res.status(200).json(doc)
            })
    })
    //полное изменение описания задачи
router.post('/tasks/:id/descr', (req, res) => {
    const taskId = req.params.id
    const { title, descr, completed } = req.body

    if (!title) {
        res.status(400).json({ message: 'Не передан обязательный заголовок задачи(tittle)' })
        return
    }

    Todo.findOneAndUpdate({ _id: taskId }, {
            title: title,
            descr: descr,
            completed: completed
        }, { safe: true, upsert: true },
        (err, doc) => {
            if (err) {
                res.status(500).json({ error: 'Не удалось сохранить сообщение в БД' })
                return
            }

            res.status(200).json(doc)
        })
})
router.get('*', (req, res) => {
    res.status(404).json({ 'message': 'такой страницы нет(' })
})

module.exports = router
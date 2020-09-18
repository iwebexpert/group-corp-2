const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    res.status(200).json(todos)

})

router.get('/add', async (req, res) => {
    const todos = await Todo.find({}).lean()
    res.status(200).json(todos)

})

router.get('/delete', async (req, res) => {

    const todos = await Todo.find({}).lean()

    res.status(200).json(todos)
})

router.post('/add', async (req, res) => {

    const title = req.body.title
    if (!title) {
        res.status(400).json({ error: 'Необходимо передать название задачи' })
        return
    }
    const todo = new Todo({
        title
    })
    await todo.save((err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Не удалось сохранить новую задачу' })
            return
        }
        res.status(201).json(doc)
    })

})

router.patch('/complete', async (req, res) => {
    const id = req.body.id
    if (!id) {
        res.status(400).json({ error: 'Необходимо передать id задачи' })
        return
    }

    const todo = await Todo.findById(id, (err, doc) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось изменить статус задачи', id })
            return
        }
    })

    if (todo.completed) {
        todo.completed = !!req.body.completed
    } else {
        todo.completed = !req.body.completed
    }

    await todo.save((err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Не удалось поменять статус задачи' })
            return
        }
        res.status(200).json(doc)
    })

})

router.delete('/remove/:id', async (req, res) => {

    const id = req.params.id


    if (!id) {
        res.status(400).json({ error: 'Не передан id задачи' })
        return
    }

    const todo = await Todo.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Не удалось удалить задачу', id })
            return
        }
        res.json(doc)
    })


})

router.get('*', (req, res) => {
    res.status(404).json({ 'message': 'Такой страницы не существует' })
})
module.exports = router
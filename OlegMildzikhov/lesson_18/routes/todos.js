const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async(req, res) => {
    const todos = await Todo.find({})
    const todosInProg = await Todo.find({ completed: false })
    const todosComp = await Todo.find({ completed: true })
    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos,
        todosInProg,
        todosComp
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create', async(req, res) => {
    if (req.body.title.length < 1) {
        return
    } else {
        const todo = new Todo({
            title: req.body.title
        })

        await todo.save()
        res.redirect('/')
    }
})



router.post('/complete', async(req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()
    res.redirect('/')
})

module.exports = router
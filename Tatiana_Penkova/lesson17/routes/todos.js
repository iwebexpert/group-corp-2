const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    res.render('tasks', {
        isIndex: true,
        todos
    })
})

router.get('/add', (req, res) => {
    res.render('add', {
        isAdded: true
    })
})

router.get('/delete', async (req, res) => {

    const todos = await Todo.find({}).lean()

    res.render('delete', {
        isDeleted: true,
        todos
    })
})

router.post('/add', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    console.log(todo)
    todo.completed = !!req.body.completed
    await todo.save()
    res.redirect('/')
})

router.post('/remove', async (req, res) => {

    const todo = await Todo.findByIdAndDelete(req.body.id, (err, docs) => {
        if (err) {
            console.log(err)
        } else {
            console.log('deleted:', docs)
        }
    })

    res.redirect('/')
})

router.get('*', (req, res) => {
    res.status(404).render('error', { layout: 'default' })
})
module.exports = router
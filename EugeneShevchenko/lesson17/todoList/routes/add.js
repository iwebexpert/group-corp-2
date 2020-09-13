const {Router} = require('express')
const Task = require('../models/tasks')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
      title: 'Добавить задачу',
      isAdd: true
    })
})

router.post('/', async (req, res) => {
    const task = new Task(req.body.title, req.body.description)

    await task.save()

    res.redirect('/done')
})

module.exports = router
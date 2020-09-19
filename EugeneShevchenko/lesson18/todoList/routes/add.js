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
    const task = new Task({
      title: req.body.title,
      description: req.body.description
    })

    try {
      await task.save()
      res.redirect('/done')
    } catch(e) {
      console.log(e)
    }
})

module.exports = router
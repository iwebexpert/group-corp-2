const {Router} = require('express')
const Task = require('../model/tasks')
const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({message: 'Страница добавления задачи'})
})

router.post('/', async (req, res) => {
    const title = 'задача 10'
    const task = new Task({
        title,
        description: 'отправить заказчику'
    })

    if (!title) {
        res.status(400).json({error: 'Необходимо передать title'})
        return
    }

    try {
      await task.save()
      res.status(200).json(task)
    } catch(e) {
      res.status(500).json({error: 'Неудалось сохранить данные в БД'})
      return
    }
})

module.exports = router
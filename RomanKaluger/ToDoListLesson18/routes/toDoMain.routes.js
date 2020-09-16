const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const ToDoItem = require('./../models/toDoItem')
const uniqid = require('uniqid')
const config = require('./../config/serverConfig')
const router = Router()

router.get('/list/:sorter?/:updown?', async (req, res) => {
    try {
        let {sorter, updown} = req.params
        if (!(sorter && updown)) {
            res.redirect('/todo/list/date/asc')
            return
        }
        const toDOItems = await ToDoItem.find({}).sort({[sorter]: updown}).lean()
        toDOItems.forEach(item => {
            item.classes = `toDoCardStatus${item.completed?' toDoCardStatusCompleted':''}`
            item.priorityImg = config.priorityImgsUrl[item.priority]
        })
        res.render('toDoList', {layout: 'default', toDOItems})
    } catch (e) {
        res.status(500).json({message: 'Произошло недоразумение, попробуйте снова'})
    }
})

router.delete(`/list/:id`, async (req, res) => {
        try {
            const {id} = req.params
            if (id === 'ALL') {
                await ToDoItem.deleteMany({})
                res.status(200).send({message: 'All was deleted'})
                return
            }
            const candidate = await ToDoItem.findOne({id}).lean()
            if (candidate) {
                await ToDoItem.deleteOne({id})
                res.status(200).send({candidate})
                return
            }
            res.status(200).send({message: 'item was not found'})
        } catch (e) {
            res.status(500).json({message: 'Произошло недоразумение, попробуйте снова'})
        }
    })

router.patch('/list',
    [
        check('id', 'Неверные данные').isString(),
        check('completed', 'Неверные данные').isBoolean(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'некорректные данные'
                })
            }
            const {id, completed} = req.body
            await ToDoItem.updateOne({id},  { completed } )
            res.status(200).send()
        } catch (e) {
            console.log(e.message)
            res.status(500).json({message: 'Произошло недоразумение, попробуйте снова'})
        }
    })


router.post('/list',
    [
        check('text', 'Неверные данные').isString(),
        check('date', 'Неверные данные').isString(),
        check('priority', 'Неверные данные').isString(),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'некорректные данные'
            })
        }
        const {text, date, priority} = req.body
        const toDoItem = new ToDoItem({text, date, completed: false, id: uniqid(), priority})
        await toDoItem.save()
        res.status(201).send()
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: 'Произошло недоразумение, попробуйте снова'})
    }
})

module.exports = router

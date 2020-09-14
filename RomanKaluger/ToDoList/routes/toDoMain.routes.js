const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const ToDoItem = require('./../models/toDoItem')
const uniqid = require('uniqid')
const router = Router()

router.get('/list', async (req, res) => {
    try {
        const toDOItems = await ToDoItem.find({}).lean()
        toDOItems.forEach(item => {
            item.classes = `toDoCardStatus${item.completed?' toDoCardStatusCompleted':''}`
        })
        res.render('toDoList', {layout: 'default', toDOItems})
    } catch (e) {
        res.status(500).json({message: 'Произошло недоразумение, попробуйте снова'})
    }
})

router.delete(`/list/:id`, async (req, res) => {
        try {
            const {id} = req.params
            await ToDoItem.deleteOne({id})
            res.status(200).send()
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
        const {text, date} = req.body
        const toDoItem = new ToDoItem({text, date, completed: false, id: uniqid()})
        await toDoItem.save()
        res.status(201).send()
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: 'Произошло недоразумение, попробуйте снова'})
    }
})

module.exports = router

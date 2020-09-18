const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const ToDoItem = require('./../models/toDoItem')
const uniqid = require('uniqid')
const router = Router()

router.get('/list/:sorter?/:updown?', async (req, res) => {
    try {
        let {sorter, updown} = req.params
        if (!(sorter && updown)) {
            sorter = 'date'
            updown = 'desc'
        }
        const toDOItems = await ToDoItem.find({}).sort({[sorter]: updown}).lean()
        res.status(200).json({toDOItems})
    } catch (e) {
        res.status(500).json({message: 'Произошло недоразумение, попробуйте снова'})
    }
})

router.delete(`/list/:id`, async (req, res) => {
        try {
            const {id} = req.params
            if (id === 'all') {
                await ToDoItem.deleteMany({})
                res.status(200).json({message: 'All was deleted'})
                return
            }
            await ToDoItem.findOneAndRemove({id}, (err, doc) => {
                if (err) {
                    res.status(404).json({message: 'Record was not found'})
                    return
                }
                res.status(200).json(doc)
            })
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
            await ToDoItem.findOneAndUpdate({id},  { completed }, (err, doc) => {
                if (err) {
                    res.status(404).json({message: 'Record was not found'})
                    return
                }
                res.status(200).json(doc)
            })
        } catch (e) {
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
        res.status(201).json(toDoItem)
    } catch (e) {
        res.status(500).json({message: 'Произошло недоразумение, попробуйте снова'})
    }
})

router.get('*', (req, res) => {
    res.status(404).json({ error: 'Не удалось найти страницу по указанному пути' })
})

module.exports = router

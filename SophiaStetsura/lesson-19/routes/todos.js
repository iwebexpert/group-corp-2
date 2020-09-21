const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()


router.get('/', async(req, res) => {
    const todoAll = await Todo.find({});
    res.status(200).json({ message: 'Задачи доступны по адресу: /taskAll' });
});

router.get('/taskAll', async(req, res) => {
    const todoAll = await Todo.find({});
    res.status(200).json(todoAll);
});

router.get('/taskAll/:id', async(req, res) => {
    const taskId = req.params.id;
    const task = await Todo.findById({ _id: taskId });
    res.status(200).json(task);
})

router.post('/taskAll', async(req, res) => {
    const title = req.body.title;
    if (!title) {
        console.log(req.body.title);
        res.status(400).json({ error: 'Необходимо передать title' });
        return;
    }

    const newTask = new Todo({
        title
    });
    newTask.save((err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Не удалось сохранить данные в БД' });
            return;
        }
        res.status(200).json(doc);
    });
});

router.post('/taskAll/:id', (req, res) => {
    const id = req.params.id;
    const { title } = req.body;

    if (!title) {
        res.status(400).json({ message: 'Не передан  заголовок задачи(title)' });
        return;
    }

    Todo.findOneAndUpdate({ _id: id }, {
            title: title
        }, { safe: true, upsert: true },
        (err, doc) => {
            if (err) {
                res.status(500).json({ error: 'Не удалось сохранить сообщение в БД' });
                return;
            }

            res.status(200).json(doc);
        })
})

router.delete('/taskAll/:id', async(req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({ error: 'Не передан идентификатор задачи', id });
    }

    const task = await Todo.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            res.status(400).json({ error: 'не удалось удалить задачу', id });
            return;
        }
        res.json(doc);
    })
})


// router.post('/', async(req, res) => {
//     const todo = new Todo({
//         title: req.body.title
//     });
//     await todo.save();
//     // let thing_to_do = req.body.task;
//     // data.push(thing_to_do);
//     res.redirect('/');
// });

// router.get('/complete/:index', function(req, res) {
//     let thingsDone = data.splice(req.params.index, 1);
//     doneItems.push(thingsDone)
//     console.log(doneItems)
//     res.redirect('/')
// });

module.exports = router

const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()


router.get('/', async (req, res) => {
    const todoAll = await Todo.find({});
    res.render('home', {
        layout: false,
        todoAll
    })
    // console.log(data);
});

router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    });
    await todo.save();
    // let thing_to_do = req.body.task;
    // data.push(thing_to_do);
    res.redirect('/');
});

router.get('/complete/:index', function (req, res) {
    let thingsDone = data.splice(req.params.index, 1);
    doneItems.push(thingsDone)
    console.log(doneItems)
    res.redirect('/')
});

module.exports = router
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
let tasks = require('./helpers/tasks');
const app = express();

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('tasks', { layout: 'default', tasks })
})

app.post('/tasks', (req, res) => {
    const { title } = req.body
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = i;
    }
    if (title) {
        tasks.push({
            title,
            completed: false,
            date: new Date().toLocaleString(),
            id: tasks.length,
        });
    }
    res.redirect('/');
})

app.delete('/tasks/:id', (req, res) => {
    let id = req.params.id;
    tasks = tasks.filter((item) => item.id !== +id);
    res.render('tasks', { layout: 'default', tasks });
})

app.patch('/tasks/:id', (req, res) => {
    let id = req.params.id
    tasks = tasks.map(task => {
        if (task.id == id) {
            task.completed = !task.completed
            return task;
        } else {
            return task;
        }
    })

    res.render('tasks', { layout: 'default', tasks });
})

app.get('/task/:id', (req, res) => {
    const id = (req.params.id) ? req.params.id : null;
    const task = tasks[id];

    res.render('task', { layout: 'default', task });
})

app.get('*', (req, res) => {
    res.status(404).render('error', { layout: 'default' });
})

app.listen(4000, () => {
    console.log('Server is running');
    console.log('http://localhost:4000/')
})






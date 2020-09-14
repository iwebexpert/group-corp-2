const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

let todos = require('./helpers/todos');

const app = express();

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/todos');
});

app.get('/todos', (req, res) => {
    res.render('todos', {todos});
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;

    todos.forEach(todo => {
        if (todo.id == parseInt(id)) todo.completed = !todo.completed;
    });

    res.render('todos', {todos});
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    // console.log(id);

    todos = todos.filter((todo) => todo.id !== parseInt(id))

    // console.log(todos);

    res.render('todos', {todos});
})

app.post('/todos', (req, res) => {
    const {title} = req.body;

    console.log(title);

    if (title) {
        todos[todos.length] = {
            id: todos[todos.length - 1].id + 1,
            title: title,
            completed: false,
        };
    }

    res.redirect('/todos');
})

//Errors
app.get('*', (req, res) => {
    res.status(404).render('error', {layout: 'default'});
});

app.listen(4000, () => {
    console.log('Serverstarted!');
    console.log('http://localhost:4000');
});
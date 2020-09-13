const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const port = 3000;
const tasks = require('./helpers/tasks');
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
  res.render('tasks', {layout: 'default', tasks});
});

app.post('/tasks', (req, res) => {
  const {title} = req.body;
  const newTask = {
    id: tasks.length,
    title,
    completed: false,
  }
  tasks.push(newTask);
  res.redirect('/');
});

app.get('/tasks/:id', (req, res) => {
  const id = (req.params.id) ? req.params.id : null;
  const task = tasks[id];
  res.render('task', {layout: 'default', task});
});

app.listen(port, () => {
  console.log(`port: ${port}`);
});
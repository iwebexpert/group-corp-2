const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require("mongoose");

const model = require('./models/todos');
mongoose.connect("mongodb://root:1234@localhost:27017/tasks?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

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

app.get('/todos', async (req, res) => {
    const todos = await model.find({}).lean();
    res.render("todos", { todos });
});

app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        console.log(400);
        res.redirect("/todos");
        return;
    }

    const todo = await model.findByIdAndUpdate({ id: id }).lean();
    await model.findByIdAndUpdate(id, {completed: !todo.completed}, (err, doc) => {
        if (err) {
            console.log(err, 400);
            return;
        }
        res.json(doc);
    });
});

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        console.log(400);
        res.redirect("/todos");
        return;
    }

    await model.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            console.log(err, 400);
            return
        }
        res.json(doc);
    })
})

app.post('/todos', async (req, res) => {
    const { title } = req.body;

    console.log(title);

    if (!title) {
        console.log(err, 400);
        res.redirect("/todos");
        return;
    } else {
        const todo = new model({ title, completed: false })
            .save((err, doc) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        res.redirect('/todos');
    }
});

//Errors
app.get('*', (req, res) => {
    res.status(404).render('error', {layout: 'default'});
});

app.listen(4000, () => {
    console.log('Serverstarted!');
    console.log('http://localhost:4000');
});
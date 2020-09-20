const express = require('express');
const mongoose = require("mongoose");

const model = require('./models/todos');
mongoose.connect("mongodb://root:1234@localhost:27017/tasks?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(301).json({ message: "Упс! Адрес списка задач: /todos" });
});

app.get('/todos', async (req, res) => {
    const todos = await model.find({}).lean();
    res.status(200).json(todos);
});

app.patch('/todos/:id/:completed', async (req, res) => {
    const id = req.params.id;
    const completed = res.params.completed === "true";
    if (!id) {
        console.log(400).json({ error: "Отсутствует ID выбранной задачи" });
        return;
    }

    const todo = await model.findByIdAndUpdate(id, { completed: !completed }, (err, doc) => {
        if (err) {
            res.status(400).json({ error: "Не удалось обновить состояние задачи", id });
            return;
        }
        res.json(doc);
    });
});

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: "Отсутствует ID выбранной задачи" });
        return;
    }

    await model.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            res.status(400).json({ error: "Задача не удалена", id });
            return
        }
        res.json(doc);
    })
})

app.post('/todos', async (req, res) => {
    const { title } = req.body;

    if (!title) {
        res.status(400).json({ error: "Отсутствует название задачи" });
        return;
    }

    const todo = new model({ title })
        .save((err, doc) => {
            if (err) {
                res.status(500).json({ error: "Ошибка в работе с БД" });
                return;
            }
        });
        res.status(200).json(doc);
});

//Errors
app.get('*', (req, res) => {
    res.status(404).json({ error: "Страница не найдена" });
});

app.listen(4000, () => {
    console.log('Serverstarted!');
    console.log('http://localhost:4000');
});
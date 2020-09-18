const express = require("express");

const mongoose = require("mongoose");

//models
const tasksModel = require("./models/tasks");

mongoose.connect("mongodb://root:1234@localhost:27017/tasks?authSource=admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Задания доступны по адресу: /todos " });
});

app.get("/todos", async (req, res) => {
  const tasks = await tasksModel.find({}).lean();
  res.status(200).json(tasks);
});

app.post("/todos", (req, res) => {
  const title = req.body.title;
  if (!title) {
    res.status(400).json({ message: "Не передан title" });
    return;
  }

  const newTask = new tasksModel({ title });
  newTask.save((err, doc) => {
    if (err) {
      res.status(500).json({ error: "Ошибка, не удалось добавить задачу" });
      return;
    }
    res.status(201).json(doc);
  });
});

app.delete("/todos/:id", async (req, res) => {
  const taskId = req.params.id;
  await tasksModel.findByIdAndRemove(taskId, (err, doc) => {
    if (err) {
      res.status(500).json({ error: "Не удалось удалить задачу" });
      return;
    }
    res.status(200).json(doc);
  });
});

app.patch("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await tasksModel.findByIdAndUpdate({ _id: id }).lean();
  await tasksModel.findByIdAndUpdate(
    id,
    { completed: !todo.completed },
    (err, doc) => {
      if (err) {
        res.status(500).json({ error: "Ошибка, не удалось изменить задачу" });
        return;
      }
      res.status(200).json(doc);
    }
  );
});

app.listen(3000, () => {
  console.log("Serverstarted!");
  console.log("http://localhost:3000");
});

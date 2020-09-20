const express = require("express");
const app = express();

const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;

const tasksModel = require("./models/tasks");

mongoose.connect(
  "mongodb+srv://gagskaya:95371gogA@cluster0.rjn0t.mongodb.net/todos",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Чаты доступны по адресу: /tasks" });
});
app.get("/tasks", async (req, res) => {
  const tasks = await tasksModel.find({}).lean();
  res.status(200).json(tasks);
});
app.post("/tasks", (req, res) => {
  const title = req.body.title;
  if (!title) {
    res.status(400).json({ error: "Передайте название задачи" });
    return;
  }

  const newTask = new tasksModel({ title });
  newTask.save((err, doc) => {
    if (err) {
      res.status(500).json({ error: "Не удалось сохранить данные в БД" });
      return;
    }
    res.status(200).json(doc);
  });
});
app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "Не передан id", id });
    return;
  }
  await tasksModel.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      res.status(400).json({ error: "Не удалось удалить задачу", id });
      return;
    }
    res.json(doc);
  });
});
app.patch("/tasks/:id/:completed", async (req, res) => {
  const id = req.params.id;
  const completed = req.params.completed === "true";
  if (!id) {
    res.status(400).json({ error: "Не передан id", id });
    return;
  }
  await tasksModel.findByIdAndUpdate(
    id,
    { completed: !completed },
    (err, doc) => {
      if (err) {
        res
          .status(400)
          .json({ error: "Не удалось обновить статус задачи", id });
        return;
      }
      res.json(doc);
    }
  );
});
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(PORT, () => {
  console.log("http://localhost:4000");
});

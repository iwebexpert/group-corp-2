const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
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

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "default",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/todos");
});

app.get("/todos", async (req, res) => {
  const tasks = await tasksModel.find({}).lean();
  res.render("todoList", { layout: "default", tasks });
});

app.post("/todos", (req, res) => {
  const title = req.body.title;
  if (!title) {
    res.redirect("/todos");
    return;
  }

  const newTask = new tasksModel({ title, completed: false });
  newTask.save((err, doc) => {
    if (err) {
      console.error(err);
      return;
    }
    res.redirect("/todos");
  });
});

app.delete("/todos/:id", async (req, res) => {
  const taskId = req.params.id;
  if (!taskId) {
    res
      .status(400)
      .json({ error: "Не передан идентификатор задачи", id: taskId });
    return;
  }
  const task = await tasksModel.findByIdAndRemove(taskId, (err, doc) => {
    if (err) {
      res.status(400).json({ error: "Не удалось удалить задачу", id: taskId });
      return;
    }
    res.json(doc);
  });
});

app.patch("/todos/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "Не передан идентификатор задачи", id });
    return;
  }
  const todo = await tasksModel.findByIdAndUpdate({ _id: id }).lean();
  await tasksModel.findByIdAndUpdate(
    id,
    { completed: !todo.completed },
    (err, doc) => {
      if (err) {
        res
          .status(400)
          .json({ error: "Ошибка, не удалось изменить задачу", id });
        return;
      }
      res.json(doc);
    }
  );
});

app.listen(3000, () => {
  console.log("Serverstarted!");
  console.log("http://localhost:3000");
});

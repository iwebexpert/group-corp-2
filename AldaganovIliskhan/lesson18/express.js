const express = require("express");
const app = express();

const hbs = require("express-handlebars");
const path = require("path");
// let tasks = require("./helpers/tasks");
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
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "default",
    layoutsDir: path.join(__dirname, "views", "layouts"),
  })
);

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/tasks");
});
app.get("/tasks", async (req, res) => {
  const tasks = await tasksModel.find({}).lean();
  res.render("tasks", { layout: "default", tasks });
});
app.post("/tasks", (req, res) => {
  const title = req.body.title;
  if (!title) {
    res.redirect("/tasks");
    return;
  }

  const newTask = new tasksModel({ title });
  newTask.save((err, doc) => {
    if (err) {
      console.error(err);
      return;
    }
    res.redirect("/tasks");
  });
});
app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
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
app.listen(PORT, () => {
  console.log("http://localhost:4000");
});

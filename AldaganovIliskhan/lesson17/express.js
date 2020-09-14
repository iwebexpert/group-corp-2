const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const app = express();
let tasks = require("./helpers/tasks");
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
app.get("/tasks", (req, res) => {
  res.render("tasks", { layout: "default", tasks });
});
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (title) {
    tasks.push({
      id: tasks.length + 1,
      title,
      completed: false,
    });
  }
  res.redirect("/tasks");
});
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter((item) => item.id !== Number(id));
  res.render("tasks", { layout: "default", tasks });
});
app.patch("/tasks/:id", (req, res) => {
  const id = req.params.id;
  tasks.map((item) => {
    if (item.id === Number(id)) {
      item.completed = !item.completed;
    }
  });
  console.log(tasks);
});
app.listen(4000, () => {
  console.log("http://localhost:4000");
});

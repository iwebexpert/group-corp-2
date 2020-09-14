const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");

const tasks = require("./helpers/tasks");
const Task = require("./helpers/Task");

const app = express();

let id = 0;

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
  res.render("todoList", { layout: "default", tasks });
});

app.post("/", async (req, res) => {
  let title = JSON.stringify(req.body.title);
  const newTitle = title.replace(/"/g, "");
  if (newTitle !== "") {
    await tasks.push(new Task(newTitle, id));
    await res.render("todoList", { layout: "default", tasks });
    console.log(tasks);
  }
  id++;
});

app.listen(3000, () => {
  console.log("Serverstarted!");
  console.log("http://localhost:3000");
});

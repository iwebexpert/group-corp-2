const { Router } = require("express");
const router = Router();
const Task = require("../models/modelTask");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", (req, res) => {
  res.redirect("/tasks");
});

router.get("/tasks", async (req, res) => {
  // запрос к базе данных
  const tasks = await Task.find({}).lean();
  res.render("tasks", {
    tasks,
  });
});

router.post("/tasks", urlencodedParser, async (req, res) => {
  const task = new Task({
    todoTitle: req.body.title,
  });
  //   сохранение задачи
  await task.save();
  res.redirect("/");
});
router.post("/complete", urlencodedParser, async (req, res) => {
  const task = await Task.findById(req.body.id);
  console.log(req.body.completed)
  task.completed = req.body.completed === 'false' ? true : false;
  await task.save();
  res.redirect("/");
});
router.post("/delete", urlencodedParser, async (req, res) => {
  const task = await Task.deleteOne({ _id: req.body.id });
  res.redirect("/");
});
module.exports = router;

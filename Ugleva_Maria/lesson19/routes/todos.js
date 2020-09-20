const { Router } = require("express");
const router = Router();
const Task = require("../models/modelTask");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", (req, res) => {
  res.status(200).json("Чаты доступны по адресу: /tasks");
});

router.get("/tasks", async (req, res) => {
  const task = await Task.find({}).lean();
  res.status(200).json(task);
});

router.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById({ _id: req.params.id }).lean();
  res.status(200).json(task);
});

router.post("/tasks", urlencodedParser, async (req, res) => {
  console.log(req.query)
  if (!req.body.title) {
    res.status(400).json({ error: "нужно передать title" });
    return;
  }
  const task = new Task({
    todoTitle: req.body.title,
  });
  //   сохранение задачи
  await task.save((err, doc) => {
    if (err) {
      res.status(500).json({ error: "ошибка при сохранении" });
      return;
    }
    res.status(200).json(doc);
  });
});
router.post("/complete", urlencodedParser, async (req, res) => {
  const task = await Task.findById(req.body.id);
  task.completed = req.body.completed === "false" ? true : false;
  await task.save();
  res.redirect("/");
});
router.delete("/tasks/:id", urlencodedParser, async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "Не передан идентификатор чата", id });
    return;
  }
  const task = await Task.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      res.status(400).json({ error: "Не удалось удалить чат", id });
      return;
    }
    res.json(doc);
  });
});
module.exports = router;

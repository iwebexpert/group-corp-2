const { Router } = require("express");
const Todo = require("../modals/Todo");
const router = Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find({}).lean();
  res.render("index", {
    title: "Todos",
    isIndex: true,
    todos,
  });
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create Todo",
    isCreate: true,
  });
});

router.post("/create", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });
  await todo.save();
  res.redirect("/");
});

router.post("/complete", async (req, res) => {
  const todos = await Todo.find({}).lean();
  const checkedIds = req.body.checked;
  console.log(checkedIds);
  console.log(typeof checkedIds);
  todos.forEach(async (element) => {
    let todo = await Todo.findById(element._id);
    if (
      (checkedIds instanceof Object &&
        Object.values(checkedIds).includes(todo.id)) ||
      (checkedIds instanceof String && checkedIds == todo.id)
    ) {
      todo.completed = true;
    }
    if (
      (checkedIds instanceof Object &&
        !Object.values(checkedIds).includes(todo.id)) ||
      (checkedIds instanceof String && checkedIds !== todo.id) ||
      checkedIds == undefined
    ) {
      todo.completed = false;
    }
    todo.save();
  });
  res.redirect("/");
});

router.post("/delete", async (req, res) => {
  let todo = await Todo.findById(req.body.id);
  console.log(todo);
  todo.deleteOne();
  await todo.save();
  res.redirect("/");
});

module.exports = router;

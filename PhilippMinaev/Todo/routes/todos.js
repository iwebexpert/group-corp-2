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
  if (req.body.title) {
    const todo = new Todo({
      title: req.body.title,
    });
    await todo.save();
    res.redirect("/");
  } else {
    res.redirect("/create");
  }
});

router.post("/complete", async (req, res) => {
  const checked = req.body.checked;
  const todos = await Todo.find({}).lean();
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  const start = async (todos) => {
    await asyncForEach(todos, async (task) => {
      let todo = await Todo.findById(task._id);
      switch (typeof checked) {
        case "object":
          Object.values(checked).find((item) => item == todo._id) == todo._id
            ? (todo.completed = true)
            : (todo.completed = false);
          break;
        case "string":
          checked == todo._id
            ? (todo.completed = true)
            : (todo.completed = false);
          break;
        case "undefined":
          todo.completed = false;
          break;

        default:
          break;
      }
      await todo.save();
    });
  };
  start(todos).then(() => {
    res.redirect("/");
  });
});

router.post("/delete", async (req, res) => {
  await Todo.findByIdAndDelete(req.body.id);
  res.redirect("/");
});

module.exports = router;

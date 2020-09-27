const { Router } = require("express");
const Todo = require("../modals/Todo");
const router = Router();

router.get("/", async (req, res) => {
  res.status(302).json({ message: "Чаты доступны по адресу /todos" });
});

router.get("/todos", async (req, res) => {
  const todos = await Todo.find({}).lean(); //.lean
  // res.status(200).json(todos);
  res.render("index", {
  title: "Todos",
  isIndex: true,
  todos,
  });
});

router.get("/todos/:id", async (req, res) => {
  const lengthOfIdInMongoDb = 24;
  if (req.params.id.length == lengthOfIdInMongoDb) {
    const todo = await Todo.findById({ _id: req.params.id }).lean(); //.lean
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "id не найден" });
    }
  } else {
    res.status(400).json({ message: "Неверный id" });
  }
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create Todo",
    isCreate: true,
  });
  // res.status(200).json({ message: "Страница создания" });
});

router.post("/create", async (req, res) => {
  if (req.body.title) {
    const todo = new Todo({
      title: req.body.title,
    });
    await todo.save();
    res.redirect("/");
    // res
    //   .status(200)
    //   .json({ message: `Todo c названием ${req.body.title} cохранено` });
  } else {
    res.redirect("/create");
    // res.status(400).json({ message: `Не введен title` });
  }
});

router.patch("/change-status/:id", async (req, res) => {
  const lengthOfIdInMongoDb = 24;
  // if (req.params.id.length == lengthOfIdInMongoDb) {
  //   const todo = await Todo.findById(req.params.id);
  //   if (todo) {
  //     todo.completed = !todo.completed;
  //     await todo.save();
  //     res
  //       .status(400)
  //       .json({ message: `${todo.title} - completed : ${todo.completed}` });
  //   } else {
  //     res.status(404).json({ message: "id не найден" });
  //   }
  // } else {
  //   res.status(400).json({ message: "Неверный id" });
  // }
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

router.delete("/delete/:id", async (req, res) => {
  // const lengthOfIdInMongoDb = 24;
  // if (req.params.id.length == lengthOfIdInMongoDb) {
  //   const todo = await Todo.findById(req.params.id);
  //   if (todo) {
  //     todo.remove();
  //     res.status(400).json({ message: `${todo.title} - deleted` });
  //   } else {
  //     res.status(404).json({ message: "id не найден" });
  //   }
  // } else {
  //   res.status(400).json({ message: "Неверный id" });
  // }
  await Todo.findByIdAndDelete(req.body.id);
  res.redirect("/");
});

//Errors
router.get("*", (req, res) => {
  res.status(404).json({ message: "Страница не найдена" });
});

module.exports = router;

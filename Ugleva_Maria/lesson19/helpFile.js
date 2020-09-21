app.use(express.urlencoded({ extended: false }));

// обработка get запросов по пути '/' с помощью метода get
// если на адресе '/', req - приходящий запрос, res - ответ
app.get("/", (req, res) => {
  res.redirect("/tasks");
});

app.get("/tasks", (req, res) => {
  // отображение render(имя шаблона без расширения, {layout: лайаут, данные})
  res.render("tasks", { layout: "default", tasksList });
});

app.post("/tasks", (req, res) => {
  const { taskTitle } = req.body;
  if (taskTitle.length) {
    tasksList.push({
      title: taskTitle,
      id: taskTitle,
      completed: false,
    });
  }
  res.render("tasks", { layout: "default", tasksList });
});

app.get("/tasks/:taskid", (req, res) => {
  console.log(req.params);
  //   const username = req.params.username ? req.params.username : null;
  //   const user = Users[username];
  // отображение render(имя шаблона без расширения, {layout: лайаут, данные})
  res.render("task", { layout: "default" });
});

// если зашли на неправильный адрес
app.get("*", (req, res) => {
  // отправим ответ
  res.send("Меня нет! Уходи");
});

const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const mongodb =
  "mongodb+srv://rfatykhov:0000Ruslan@cluster0.0ibvu.mongodb.net/todos?retryWrites=true&w=majority"

const Schema = require("./models/Schema")

mongoose

  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    const app = express()

    app.use(express.static("public"))

    app.use(express.json())
    app.use(
      express.urlencoded({
        extended: false,
      })
    )

    //Корневая ссылка ко всем задачам

    app.get("/", (req, res) => {
      res
        .status(200)
        .json({
          message: "Список задач доступен по адресу: /todos"
        })
    })

    //Все задачи

    app.get("/todos", async (req, res) => {
      const todos = await Schema.find({}).lean()
      res.status(200).json(todos)
    })

    //Доступ к задачам по идентификатору

    app.get("/todos/:id", async (req, res) => {
      const {
        id
      } = req.params
      const todo = await Schema.findById(id).lean()
      res.status(200).json(todo)
    })

    //Добавляем новую задачу

    app.post("/todos", async (req, res) => {
      const {
        title,
        commentary
      } = req.body
      if (!title) {
        res
          .status(400)
          .json({
            error: "Необходимо передать title и commentary"
          })
        return
      }

      await new Schema({
        title: title,
        commentary: commentary,
        date: new Date().toLocaleString("ru", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      }).save((err, doc) => {
        if (err) {
          res.status(500).json({
            error: "Не удалось сохранить данные в БД"
          })
          return
        }
        res.status(200).json(doc)
      })
    })

    //Удаление задачи

    app.delete("/todos/:id", async (req, res) => {
      const {
        id
      } = req.params

      if (!id) {
        res.status(400).json({
          error: "Не передан идентификатор задачи",
          id
        })
        return
      }

      await Schema.findByIdAndRemove(id, (err, doc) => {
        if (err) {
          res.status(400).json({
            error: "Не удалось удалить задачу",
            id
          })
          return
        }
        res.json(doc)
      })
    })

    //Завершение задачи

    app.patch("/todos/:id", async (req, res) => {
      const {
        id,
        completed
      } = req.params

      if (!id) {
        res.status(400).json({
          error: "Не передан идентификатор задачи",
          id
        })
        return
      }

      await Schema.findById(id)
        .lean()
        .then((res) => res.completed)
        .then(async (completed) => {
          await Schema.findByIdAndUpdate(
            id, {
              completed: !completed
            },
            (err, doc) => {
              if (err) {
                res
                  .status(400)
                  .json({
                    error: "Не удалось завершить задачу",
                    id
                  })
                return
              }
              res.json(doc)
            }
          )
        })
    })

    //Страница не найдена
    app.get("*", (req, res) => {
      res.status(404).json({
        message: "Page not found"
      })
    })

    //Запуск сервера
    app.listen(3000, () => {
      console.log("Сервер запущен на http://localhost:3000")
    })
  })
  .then(() => console.log(`Успешное подключение в базе банных: ${mongodb}`))
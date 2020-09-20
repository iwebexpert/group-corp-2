// подключение библиотек
const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const todosRoutes = require('./routes/todos')

// получение приложения
const app = express();
// настройка движка для шаблонов
app.engine(
  "hbs",
  hbs({
    // расширения шаблонов
    extname: "hbs",
    // шаблон по умолчанию в файле
    defaultLayout: "default",
    // папка к шаблонам стандартным
    layoutsDir: path.join(__dirname, "views", "layouts"),
    // папка к шаблонам
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
// регистрация движка
app.set("view engine", "hbs");
// для считывания данных из req.body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
// подключение routera
app.use(todosRoutes);



// подключение бд
async function serverStart() {
  try {
    await mongoose.connect(
      "mongodb+srv://Maria:89622048155@cluster0.30bcf.mongodb.net/tasks",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    // поднять сервер: номер и callback
    app.listen(4000, () => {
      // ссылка для открытия в браузере
      console.log("http://localhost:4000");
    });
  } catch (e) {
    console.log(e);
  }
}
serverStart();

// запуск сервера командой node express
// если установлен nodemon, то запуск: nodemon express


mongoose.set('useUnifiedTopology', true);
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = 'mongodb+srv://rfatykhov:0000Ruslan@cluster0.0ibvu.mongodb.net/todos?retryWrites=true&w=majority'

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {

    const app = express()

    app.engine('hbs', hbs({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: path.join(__dirname, 'views', 'layouts')
    }))

    app.set('view engine', 'hbs')

    app.use(express.static('public'))

    app.use(bodyParser.json())
    app.use(express.json())
    app.use(express.urlencoded({
      extended: false
    }))

    app.use('/', require('./routes/tasks'))

    app.listen(3000, () => {
      console.log('Сервер запущен на http://localhost:3000')
    })
  }).then(() => console.log(`Успешное подключение в базе банных: ${mongodb}`))
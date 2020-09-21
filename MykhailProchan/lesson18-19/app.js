const express = require('express')
const path = require('path')
const indexRouter = require('./routes/index')
const cors = require('cors')

const mongoose = require('mongoose')
const todoModel = require('./models/model')

mongoose.connect('mongodb://localhost:27017/tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', indexRouter);

module.exports = app;
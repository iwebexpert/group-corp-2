const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const indexRouter = require('./routes/index')

const app = express()

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: path.join(__dirname, 'views'),
}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', indexRouter);

//Errors
app.get('*', (req, res) => {
  // res.send('Page not found!!!')
  res.status(404).render('error', { layout: 'default' })
})

module.exports = app;
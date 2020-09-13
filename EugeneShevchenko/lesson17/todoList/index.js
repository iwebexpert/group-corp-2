const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const doneRoutes = require('./routes/done')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/done', doneRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server has started!: ${PORT}`)
})
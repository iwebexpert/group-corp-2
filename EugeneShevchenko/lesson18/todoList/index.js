const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const doneRoutes = require('./routes/done')
const addRoutes = require('./routes/add')

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
app.use('/done', doneRoutes)
app.use('/add', addRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = `mongodb+srv://sublarki:PeOa6kDzEnYmVetC@cluster0.cvgtg.mongodb.net/todos`
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => {
      console.log(`server has started!: ${PORT}`)
    })
  } catch(e) {
    console.log(e)
  }
}

start()
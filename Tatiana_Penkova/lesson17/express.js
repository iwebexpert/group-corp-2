const express = require('express')
const mongoose = require('mongoose')
const hbs = require('express-handlebars')
const path = require('path')
const todoRoutes = require('./routes/todos')

const app = express()

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://vestanu:qwerty12345@cluster0.mgc3r.mongodb.net/todos',
            {
                useNewUrlParser: true,
                useFindAndModify: false
            }
        )
        app.listen(4000, () => {
            console.log('Serverstarted!')
            console.log('http://localhost:4000')
        })
    } catch (e) {
        console.log(e)
    }
}

start()

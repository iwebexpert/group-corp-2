const express = require('express'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    todoRouts = yrequire('./routes/todos')


const app = express(),
    port = 4000

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(todoRouts)
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))


async function start() {
    try {
        await mongoose.connect('mongodb+srv://oleg:1234@cluster0.rwb1l.mongodb.net/todo', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(port, () => console.log(`server is works on a port ${port}`))
    } catch (e) {
        console.log(e)
    }
}

start()
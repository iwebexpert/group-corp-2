const express = require('express')
const config = require ('./config/serverConfig')
const mongoose = require ('mongoose')
const hbs = require('express-handlebars')
const path = require('path')

const app = express()

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.static('public'))

app.use('/todo/', require('./routes/toDoMain.routes'))

async function start() {
    try{
        await mongoose.connect(config.mongoURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(config.port, () => {
            console.log('Server has been started localhost:4000/todo/list')
        })
    }
    catch (e) {
        console.error(e.message)
    }
}
start()

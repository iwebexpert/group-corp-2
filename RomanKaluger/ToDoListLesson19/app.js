const express = require('express')
const config = require ('./config/serverConfig')
const mongoose = require ('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

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

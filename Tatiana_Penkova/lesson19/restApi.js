const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const todoRoutes = require('./routes/todos')
const cors = require('cors')

const app = express()



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(express.static('public'))
app.use(todoRoutes)
app.use(cors())

async function start() {
    try {
        await mongoose.connect(
            'mongodb://root:1234@localhost:27017/todo?authSource=admin',
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
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

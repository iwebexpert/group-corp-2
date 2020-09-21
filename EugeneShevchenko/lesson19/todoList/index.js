const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const doneRoutes = require('./routes/done')
const addRoutes = require('./routes/add')

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())

app.use('/done', doneRoutes)
app.use('/add', addRoutes)

app.get('/', (req, res) => {
    res.status(200).json({message: 'Перейтите в /done'})
})

app.get('*', (req, res) => {
    res.status(404).json({'message': 'страница не найдена'})
})

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
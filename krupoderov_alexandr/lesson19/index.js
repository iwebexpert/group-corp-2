//Imports
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const tasksRouter = require('./routes/tasks')
const mainRouter = require('./routes/main')

mongoose.connect('mongodb+srv://aldrk:530166@cluster0.bzszm.mongodb.net/tasks\n', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/tasks', tasksRouter)
app.use('/', mainRouter)

app.get('*', (req, res) => {
	res.status(404).json({
		error: 'Такой страницы не существует'
	})
})

app.listen(PORT, () => {
	console.log(`Server is listening... PORT: ${PORT}`)
})
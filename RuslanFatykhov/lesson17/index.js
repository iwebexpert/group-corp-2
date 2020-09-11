const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const db = require('./public/db.js')

const app = express()

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'views', 'layouts'),
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index', {
		db
	})
})

app.use(express.json());
app.use(express.urlencoded({
	extended: false
}))


app.use('/todos', require('./routes/todos'))

app.listen(3000, () => {
	console.log('Сервер запущен на http://localhost:3000')
})
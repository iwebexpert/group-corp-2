const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')//Поделючение шаблониззатора
const todoRoutes = require('./routes/todos')//Импорт роута
const bodyParser = require('body-parser')
const path = require('path')

const PORT = process.env.PORT || 3000 //Берем или системную переменную или 3000

const app = express() //Объект приложения
const hbs = exphbs.create({
	defaultLayout: 'main',//Дефолтный layout
	extname: 'hbs'//Расширенеие файлов шаблонизатора
})//Для настройки hbs

app.engine('hbs', hbs.engine)//Регистрация движка, 1 - любое имя для использования, 2 - откуда взяли
app.set('view engine', 'hbs')//Использование движка(пдключение middleware), 1 - на движке используем 2 - hbs, который только зарегистрировали
app.set('views', 'views')//Регистрация папки, где будут лежать все наши виды, отсюда беруться страницы

app.use(bodyParser.urlencoded({ extended: false }))//Для считывания body
app.use(todoRoutes)//Подключение middleware, а именна наших роутов
app.use(express.static(path.join(__dirname, 'public')))


async function start(){
	try{
		await mongoose.connect('mongodb+srv://aldrk:530166@cluster0.bzszm.mongodb.net/todos', {
			useNewUrlParser: true,
			useFindAndModify: false
		})//Подключение к БД, 1 - , 2 - объект опций (useNewUrlParser - парс урллв,useFindAndModify - чтобы не было warnings)
		app.listen(PORT, () => {
			console.log(`Server has been started... On port ${PORT}`)
		}) //callback вызовется, если сервер уже запущен
	} catch (error) {
		console.log(error)//Вывод ошибки
	}
}

start()
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const users = require('./helpers/users')

const app = express()

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
}))

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/users')
})

app.get('/users', (req, res) => {
    res.render('users', {layout: 'default', users})
})

app.post('/users', (req, res) => {
    const toDoBd = {
		id: users.length,
		title: req.body.title,
		comments: req.body.comments,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
	}

    users.push(toDoBd)
    res.render('users', {layout: 'default', users})
})

app.post('/users/:id', (req, res) => {
    for(let i = 0; i < users.length; i++){
        if(req.params.id == users[i].id) users.splice(i, 1)
    }
    res.render('users', {layout: 'default', users})
})

app.listen(4000, () => {
    console.log('Serverstarted!')
    console.log('http://localhost:4000')
})
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

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/users')
})

app.get('/users', (req, res) => {
    res.render('users', { layout: 'default', users })
})

app.post('/users', (req, res) => {
    if (req.body.title !== '' && req.body.comments !== '') {
        console.log('Всё ок')
        const todoBD = {
            id: users.length,
            title: req.body.title,
            comments: req.body.comments
        }

        users.push(todoBD)
        res.render('users', { layout: 'default', users })
    } else {
        console.log('Введите что-нибудь')
    }
})

app.post('/users/:id', (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (req.params.id == users[i].id) {
            users.splice(i, 1)
        }
    }
    res.render('users', { layout: 'default', users })
})

app.listen(4000, () => {
    console.log('Serverstarted! http://localhost:4000')
}) 
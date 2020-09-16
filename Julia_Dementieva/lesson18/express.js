const express = require('express')
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')

const tasksModel = require('./models/tasks')

mongoose.connect('mongodb+srv://DemJul:d1e2m3jul@cluster0.ond2i.gcp.mongodb.net/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const app = express()

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.redirect('/tasks')
})


app.get('/tasks', async (req, res) => {
    const tasks = await tasksModel.find({}).lean()
    console.log(tasks)
    
    res.render('tasks', {layout: 'default', tasks})
})

app.post('/tasks', async (req, res) => {
    let {taskname, comment} = req.body
    if(!taskname){
        res.redirect('/tasks')
        return
    }
    if(!comment){
        comment = 'Комментарий отсутствует'
    }
    const newTask = new tasksModel({taskname, comment, check: "false"})
    newTask.save((err, doc) => {
        if(err){
            console.error(err)
            return
        }
        res.redirect('/tasks')
    })

})


app.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const {check} = req.body
    const task = await tasksModel.findByIdAndUpdate(id, {$set:{check: check}}, (err, cur)=>{
        if(err){
            res.status(400).json({error: 'Не удалось изменить статус', id})
            return
        }
        res.redirect('/tasks')
    })
})

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id
    
    if(!id){
        res.status(400).json({error: 'Идентификатор не верен', id})
        return
    }

    const task = await tasksModel.findByIdAndRemove(id, (err, doc) => {
        if(err){
            res.status(400).json({error: 'Удаление - ошибка', id})
            return
        }
        res.json(doc)
    })
})

app.get('/tasks/:id', async (req, res) => {

    const taskId = req.params.id
    const task = await tasksModel.findById({_id: taskId}).lean()
    res.render('task', {layout: 'default', task})
})


//Errors
app.get('*', (req, res) => {
    // res.send('Page not found!!!')
    res.status(404).render('error', {layout: 'default'})
})

app.listen(4000, () => {
    console.log('Serverstarted!')
    console.log('http://localhost:4000')
})
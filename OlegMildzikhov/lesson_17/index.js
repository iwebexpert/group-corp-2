const express = require('express'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    path = require('path')

const app = express(),
    port = 4000

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))


let task = ['покормить кота'],
    complete = ['купить книги', 'выкинуть мусор']


app.post("/addtask", function(req, res) {
    let newTask = req.body.newtask;
    if (newTask.length > 4) {
        task.push(newTask);
    }
    console.log('Нельзя добавить пустую строку(')
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    let completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (let i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.get('/', (req, res) => {
    res.render('todo', { layout: 'default', task: task, complete: complete })
})

app.get('*', (req, res) => {
    res.send('something go wrong((')
})


app.listen(port, () => console.log(`server is works on a port ${port}`))
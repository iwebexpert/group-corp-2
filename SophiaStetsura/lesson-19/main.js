console.log('Hi, bro!');

const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const data = [];
const app = express();


app.engine('handlebars', handlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(todoRoutes);
let doneItems = [];


const PORT = process.env.PORT || 3000;
async function start() {
    try {
        await mongoose.connect('mongodb+srv://sophie:1q2w3e4r@cluster0.1p1aw.mongodb.net/todo', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log('Server has been started...')
        });
    } catch (e) {
        console.log(e);
    }
}

start();
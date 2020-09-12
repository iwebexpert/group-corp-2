
console.log('Hi, bro!');

const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars')
const data = [];
const app = express();

app.engine('handlebars', handlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

let doneItems = [];

app.get('/', function (req, res) {
  res.render('home', {
    layout: false,
    data: data,
    complete: doneItems
  })
  console.log(data);
});

app.post('/', function (req, res) {
  let thing_to_do = req.body.task;
  data.push(thing_to_do);
  res.redirect('/');
});

app.get('/complete/:index', function (req, res) {
  let thingsDone = data.splice(req.params.index, 1);
  doneItems.push(thingsDone)
  console.log(doneItems)
  res.redirect('/')
});

app.listen(3000, function () {
  console.log('Success!');
})

const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const template = require('./template/tasks');
const port = 3000;
let tasks = require('./helpers/tasks');
const app = express();

mongoose.connect('mongodb://root:12345@localhost:27017/tasks?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', async(req, res) => {
  let tasks = await template.find({}).lean();
  res.status(200).json(tasks);
});

app.post('/tasks', async(req, res) => {
  const {title} = req.body;
  const newTask = new template({ title });
  newTask.save((err, doc) => {
    res.status(200).json(doc);
  });
});

app.get('/task/:id', async(req, res) => {
  let id = 0;
  if (req.params.id) {
    id = req.params.id;
  } else {
    id = null;
  }
  let task = await template.findById({_id: id}).lean();
  res.status(200).json(task);
});

app.delete('/tasks/:id', async(req, res) => {
  let id = req.params.id;
  await template.findByIdAndDelete(id, (err, doc) => {
    res.status(200).json(doc);
  });
});

app.patch('/tasks/:id', async(req, res) => {
  let id = req.params.id;
  let task = await template.findById({ _id: id }).lean();
  await template.findByIdAndUpdate(id, {completed: !task.completed}, (err, doc) => {
    res.status(200).json(doc);
  })
})

app.listen(port, () => {
  console.log(`port: ${port}`);
});
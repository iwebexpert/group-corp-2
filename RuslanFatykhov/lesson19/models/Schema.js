const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  commentary: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
})

module.exports = mongoose.model("Tasks", Schema, "tasks")
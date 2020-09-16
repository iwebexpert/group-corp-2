const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Tasks", tasksSchema, "todos");

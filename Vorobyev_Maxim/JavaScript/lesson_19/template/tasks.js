const mongoose = require("mongoose");
const Schem = mongoose.Schema;
const tasksSchem = new Schem({
    title: {type: String, required: true},
    completed: {type: Boolean, default: false}
});
module.exports = mongoose.model("tasks", tasksSchem, "tasks"); 
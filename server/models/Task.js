const mongoose = require('mongoose')


const TasksSchema = new mongoose.Schema({
    title: String,
    desc: String,
    owner: String,
    state: String,
})




const TasksModel = mongoose.model("tasks", TasksSchema);

module.exports = TasksModel




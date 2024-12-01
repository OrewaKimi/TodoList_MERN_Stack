const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: String
    })

    const TodoModel = mongoose.model('Todos', TodoSchema)
    module.exports = TodoModel
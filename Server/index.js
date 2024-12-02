const express = require ('express')
const mongoose  = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo');


const app = express()
app.use (cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id : id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Request to delete ID: ${id}`);
    TodoModel.findByIdAndDelete({ _id: id })
    .then(result => {
        if (result) {
            res.json(result);
        } else {
            console.log('Todo not found');
            res.status(404).json({ error: 'Todo not found' });
        }
    })
    .catch(err => {
        console.error('Delete error:', err);
        res.status(500).json(err);
    });
});

app.post('/add', (req, res) => { 
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})
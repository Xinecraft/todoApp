const Todo = require("../models/todo");
const faker = require('faker');

exports.getShowTodos = (req, res) => {
    Todo.getAll().then(result => {
        res.json(result);
    })
}

exports.getDeleteATodo = (req, res) => {
   Todo.deleteOne(req.params.id).then(() => {
      
        req.io.emit('message',
       {
           type: 'delete',
           data: {_id: req.params.id}
       });
       res.json({code: "Success"});
   })
}

exports.getAddARandomTodo = (req, res) => {
    const ATodo = new Todo(faker.lorem.sentence(), false);
    ATodo.save()
    .then(() => {
        res.json(ATodo)
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postAddATodo = (req, res) => {
    const ATodo = new Todo(req.body.title, false);
    ATodo.save()
    .then(() => {
        res.json(ATodo)
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postToggleTodoStatus = (req, res) => {
    Todo.toggleStatus(req.body.id).then((result) => {
       res.json({status: "Update Successful"});
   })
   .catch(err => {
       console.lgo(err);
   })
}
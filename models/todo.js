const mongodb = require('mongodb');
const getDb = require("../utils/database").getDb;

class Todo {
    constructor(title,done) {
        this.title = title;
        this.done = done;
    }
    
    save() {
        const db = getDb();
        return db.collection('todos').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        });
    }
    
    static getAll()
    {
        const db = getDb();
        return db.collection('todos').find().toArray()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err)
        });
    }
    
    static deleteOne(todoId)
    {
        const db = getDb();
        return db.collection('todos').deleteOne({_id: new mongodb.ObjectId(todoId)})
        .then(res => {
            console.log("Deleted One Todo");
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    static toggleStatus(todoId)
    {
        const db = getDb();
        return db.collection('todos').findOne({_id: new mongodb.ObjectId(todoId)})
        .then((todo) => {
        if(todo.done == true)
        {
            return db.collection('todos').updateOne({_id: new mongodb.ObjectId(todoId)}, {$set: {done: false}})
        }
        else
        {
            return db.collection('todos').updateOne({_id: new mongodb.ObjectId(todoId)}, {$set: {done: true}})
        }
        })
        .catch(err => {
            console.log("Some Error");
        })
    
    }
}

module.exports = Todo;
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = (callback) => {
MongoClient.connect("mongodb+srv://zishan:kakamora786@todoapp-8fwuz.mongodb.net/todos?retryWrites=true")
.then(client => {
    console.log("Connected to MongoDB");
    _db = client.db();
    callback();
})
.catch(err => {
    console.log(err);
    throw err;
});
};

const getDb = () => {
    if(_db) return _db;
    throw "No Connection found!"
}

exports.mongoConnect = MongoConnect;
exports.getDb = getDb;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cors = require('cors')
//const io = require("socket.io")()

const app = express();

const mongoConnect = require("./utils/database").mongoConnect;

const apiRoutes = require("./routes/api");

app.use(express.static('public'))
app.use(cors());

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use("/api",apiRoutes);

app.use((req, res, next) => {
    res.status(404).json({"errorCode": 404, "errorText": "Not Found"});
})

mongoConnect(() => {
    var server = app.listen(8080);
    //io.attach(server);
    console.log("Running server");
})
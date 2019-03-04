const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api");

router.get('/', apiController.getShowTodos)

router.delete('/delete/:id', apiController.getDeleteATodo);

router.post('/add', apiController.postAddATodo);

router.get('/add/random', apiController.getAddARandomTodo);

router.post('/toggleDone', apiController.postToggleTodoStatus);

module.exports = router;
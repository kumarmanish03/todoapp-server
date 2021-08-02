// ------------------------
// router

const todoRouter = require('express').Router();

// ------------------------
// middlewares

const mkDbConn = require('../middlewares/mkDbConn');
const validateLogin = require('../middlewares/validateLogin');

todoRouter.use(mkDbConn);
todoRouter.use(validateLogin);

// ------------------------
// controllers

const createTodo = require('../controllers/createTodo');
const readTodos = require('../controllers/readTodos');
const updateTodo = require('../controllers/updateTodo');
const deleteTodo = require('../controllers/deleteTodo');

// ------------------------
// routes

todoRouter.post('/', createTodo);

todoRouter.get('/', readTodos.all);
todoRouter.get('/:todoId', readTodos.byId);

todoRouter.put('/body/:todoId', updateTodo.body);
todoRouter.put('/start/:todoId', updateTodo.start);
todoRouter.put('/end/:todoId', updateTodo.end);

todoRouter.delete('/:todoId', deleteTodo);

// ------------------------
// export router

exports = todoRouter;

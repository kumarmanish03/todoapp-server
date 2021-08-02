// ------------------------
// router

const userRouter = require('express').Router();

// ------------------------
// middlewares

const mkDbConn = require('../middlewares/mkDbConn');
const validateLogin = require('../middlewares/validateLogin');

userRouter.use(mkDbConn);

// ------------------------
// controllers

const signupUser = require('../controllers/signupUser');
const loginUser = require('../controllers/loginUser');
const readUser = require('../controllers/readUser');
const logoutUser = require('../controllers/logoutUser');

// ------------------------
// routes

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.get('/', validateLogin, readUser);
userRouter.get('/logout', validateLogin, logoutUser);

// ------------------------
// export router

module.exports = userRouter;

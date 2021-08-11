const router = require('express').Router();

const mkDbConn = require('../middlewares/mkDbConn');
const checkLogin = require('../middlewares/checkLogin');

router.use(mkDbConn);

const signup = require('../controllers/user/signup');
const login = require('../controllers/user/login');
const read = require('../controllers/user/read');
const logout = require('../controllers/user/logout');

router.post('/signup', signup);
router.post('/login', login);
router.get('/', checkLogin, read);
router.get('/logout', checkLogin, logout);

module.exports = router;

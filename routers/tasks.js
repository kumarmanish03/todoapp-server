const router = require('express').Router();

const mkDbConn = require('../middlewares/mkDbConn');
const checkLogin = require('../middlewares/checkLogin');

router.use(mkDbConn);
router.use(checkLogin);

const create = require('../controllers/tasks/create');
const read = require('../controllers/tasks/read');
const update = require('../controllers/tasks/update');
const remove = require('../controllers/tasks/delete');

router.post('/', create);

router.get('/', read.all);
router.get('/:todoId', read.byId);

router.put('/body/:taskId', update.body);
router.put('/start/:taskId', update.start);
router.put('/end/:taskId', update.end);

router.delete('/:taskId', remove);

module.exports = router;

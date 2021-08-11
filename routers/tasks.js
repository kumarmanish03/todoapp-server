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
router.get('/:taskId', read.byId);

router.put('/:taskId/body', update.body);
router.put('/:taskId/start', update.start);
router.put('/:taskId/end', update.end);

router.delete('/:taskId', remove);

module.exports = router;

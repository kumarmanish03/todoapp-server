const { ERR_TASK_NOT_FOUND } = require('../../consts');

const readAll = (req, res) => {
  const { dbConn, userId } = req;

  const sql = `
    SELECT *, CURRENT_TIMESTAMP as cur_time
    FROM tasks
    WHERE user_id = ?
  `;

  dbConn.query(sql, [userId], (err, results) => {
    if (err) return res.mk(0);
    res.mk(1, null, results);
  });
};

const readById = (req, res) => {
  const { dbConn, userId } = req;
  const { taskId } = req.params;

  const sql = `
    SELECT *, CURRENT_TIMESTAMP() as current_time
    FROM tasks
    WHERE id = ? AND user_id = ?
  `;

  dbConn.query(sql, [taskId, userId], (err, results) => {
    if (err) return res.mk(0);
    if (!task) return res.mk(0, ERR_TASK_NOT_FOUND);

    const [task] = results;
    return res.mk(1, null, task);
  });
};

module.exports = {
  all: readAll,
  byId: readById,
};

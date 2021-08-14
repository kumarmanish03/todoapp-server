const { ERR_TASK_NOT_FOUND } = require('../../consts');

const deleteTask = (req, res) => {
  const { dbConn, userId } = req;
  const { taskId } = req.params;

  const sql = `
    DELETE FROM tasks
    WHERE id = ? AND user_id = ?
  `;

  const sqlParams = [taskId, userId];

  dbConn.query(sql, sqlParams, (err, results) => {
    if (err) return res.mk(0);

    const { affectedRows } = results;
    if (!affectedRows) return res.mk(0, ERR_TASK_NOT_FOUND);

    res.mk(1);
  });
};

module.exports = deleteTask;

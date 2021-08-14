const { ERR_TASK_NOT_FOUND } = require('../../consts');

const updateBody = (req, res) => {
  const { userId, dbConn } = req;
  const { taskId } = req.params;
  const { title, description } = req.body;

  const sql = `
    UPDATE tasks
    SET title = ?, description = ?
    WHERE id = ? AND user_id = ?
  `;

  const sqlParams = [title, description, taskId, userId];

  dbConn.query(sql, sqlParams, (err, results) => {
    if (err) return res.mk(0);

    const { affectedRows } = results;
    if (!affectedRows) return res.mk(0, ERR_TASK_NOT_FOUND);

    res.mk(1);
  });
};

const start = (req, res) => {
  const { dbConn, userId } = req;
  const { taskId } = req.params;

  const sql = `
    UPDATE tasks
    SET start_time = NOW()
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

const end = (req, res) => {
  const { dbConn, userId } = req;
  const { taskId } = req.params;

  const sql = `
    UPDATE tasks
    SET end_time = NOW()
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

module.exports = {
  body: updateBody,
  start,
  end,
};

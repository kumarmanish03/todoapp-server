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

const startEnd = (req, res, type) => {
  const { dbConn, userId } = req;
  const { taskId } = req.params;

  dbConn.beginTransaction(err => {
    if (err) res.mk(0);

    const sql = `
      UPDATE tasks
      SET ${type}_time = NOW()
      WHERE id = ? AND user_id = ?
    `;

    const sqlParams = [taskId, userId];

    dbConn.query(sql, sqlParams, (err, results) => {
      if (err) return dbConn.rollback(() => res.mk(0));

      const { affectedRows } = results;
      if (!affectedRows) dbConn.rollback(() => res.mk(0, ERR_TASK_NOT_FOUND));

      const sql = `
        SELECT ${type}_time as cur_time
        FROM tasks
        WHERE id = ? AND user_id = ?
      `;

      const sqlParams = [taskId, userId];

      dbConn.query(sql, sqlParams, (err, results) => {
        if (err) return dbConn.rollback(() => res.mk(0));

        dbConn.commit(err => {
          if (err) return dbConn.rollback(() => res.mk(0));

          const [{ cur_time }] = results;
          return res.mk(1, null, { cur_time });
        });
      });
    });
  });
};

const start = (req, res) => startEnd(req, res, 'start');
const end = (req, res) => startEnd(req, res, 'end');

module.exports = {
  body: updateBody,
  start,
  end,
};

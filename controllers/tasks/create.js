const { ERR_TASK_INVALID_BODY } = require('../../consts');

const create = (req, res) => {
  const { dbConn, userId } = req;
  const { title, description } = req.body;

  if (!title) return res.mk(0, ERR_TASK_INVALID_BODY);

  const sql = `
    INSERT INTO tasks (user_id, title, description)
    VALUES (?, ?, ?)
  `;

  const sqlParams = [userId, title, description ?? ''];

  dbConn.query(sql, sqlParams, (err, results) => {
    if (err) return res.mk(0);

    res.mk(1, null, { taskId: results.insertId });
  });
};

module.exports = create;

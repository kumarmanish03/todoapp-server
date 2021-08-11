const readAll = (req, res) => {
  const { dbConn, userId } = req;

  const sql = `
    SELECT *
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
    SELECT *
    FROM tasks
    WHERE id = ? AND user_id = ?
  `;

  dbConn.query(sql, [taskId, userId], (err, [task]) => {
    if (err) return res.mk(0);
    if (!task) return res.mk(0, 'Task does not exist!');

    return res.mk(1, null, task);
  });
};

module.exports = {
  all: readAll,
  byId: readById,
};

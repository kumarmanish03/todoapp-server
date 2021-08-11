const deleteTask = (req, res) => {
  const { dbConn, userId } = req;
  const { taskId } = req.params;

  const sql = `
    DELETE FROM tasks
    WHERE id = ? AND user_id = ?
  `;

  const sqlParams = [taskId, userId];

  dbConn.query(sql, sqlParams, (err, { affectedRows }) => {
    if (err) return res.mk(0);
    if (!affectedRows) return res.mk(0, 'Task does not exist!');

    res.mk(1);
  });
};

module.exports = deleteTask;

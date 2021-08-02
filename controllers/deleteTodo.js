const deleteTodo = (req, res) => {
  const { dbConn, userId } = req;
  const { todoId } = req.params;

  const sql = `
    DELETE FROM todos
    WHERE id = ? AND user_id = ?
  `;

  const sqlParams = [todoId, userId];

  dbConn.query(sql, sqlParams, (err, { affectedRows }) => {
    if (err) return res.mk(0);
    if (!affectedRows) return res.mk(0, 'Todo does not exist!');

    res.mk(1);
  });
};

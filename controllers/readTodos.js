const readAllTodos = (req, res) => {
  const { dbConn, userId } = req;

  const sql = `
    SELECT *
    FROM todos
    WHERE user_id = ?
  `;

  dbConn.query(sql, [userId], (err, results) => {
    if (err) return res.mk(0);

    res.mk(1, null, results);
  });
};

const readTodoById = (req, res) => {
  const { dbConn, userId } = req;
  const { todoId } = req.params;

  const sql = `
    SELECT *
    FROM todos
    WHERE id = ? AND user_id = ?
  `;

  dbConn.query(sql, [todoId, userId], (err, [todo]) => {
    if (err) return res.mk(0);
    if (!todo) return res.mk(0, 'Todo does not exist!');

    return res.mk(1, null, todo);
  });
};

module.exports = {
  all: readAllTodos,
  byId: readTodoById,
};

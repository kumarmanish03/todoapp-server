const updateTodoBody = (req, res) => {
  const { dbConn, userId } = req;
  const { todoId } = req.params;
  const { title, desc } = res.body;

  const sql = `
    UPDATE todos
    SET title = ?, description = ?
    WHERE id = ? AND user_id = ?
  `;

  const sqlParams = [title, desc, todoId, userId];

  dbConn.query(sql, sqlParams, (err, { affectedRows }) => {
    if (err) return res.mk(0);
    if (!affectedRows) return res.mk(0, 'Todo does not exist!');

    res.mk(1);
  });
};

const startTodo = (req, res) => {
  const { dbConn, userId } = req;
  const { todoId } = req.params;

  const sql = `
    UPDATE todos
    SET start_time = NOW()
    WHERE id = ? AND user_id = ?
  `;

  const sqlParams = [todoId, userId];

  dbConn.query(sql, sqlParams, (err, { affectedRows }) => {
    if (err) return res.mk(0);
    if (!affectedRows) return res.mk(0, 'Todo does not exist!');

    res.mk(1);
  });
};

const endTodo = (req, res) => {
  const { dbConn, userId } = req;
  const { todoId } = req.params;

  const sql = `
    UPDATE todos
    SET end_time = NOW()
    WHERE id = ? AND user_id = ?
  `;

  const sqlParams = [todoId, userId];

  dbConn.query(sql, sqlParams, (err, { affectedRows }) => {
    if (err) return res.mk(0);
    if (!affectedRows) return res.mk(0, 'Todo does not exist!');

    res.mk(1);
  });
};

module.exports = {
  body: updateTodoBody,
  start: startTodo,
  end: endTodo,
};

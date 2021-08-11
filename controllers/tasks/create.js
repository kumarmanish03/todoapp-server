const createTodo = (req, res) => {
  const { dbConn, userId } = req;
  const { title, desc } = req.body;

  if (!title || !desc) return res.mk(0, 'Invalid body of Todo!');

  const sql = `
    INSERT INTO todos (user_id, title, description)
    VALUES (?, ?, ?)
  `;

  dbConn.query(sql, [userId, title, desc], (err, { insertId }) => {
    if (err) return res.mk(0);

    res.mk(1, null, { id: insertId });
  });
};

module.exports = createTodo;

const create = (req, res) => {
  const { dbConn, userId } = req;
  const { title, description } = req.body;

  if (!title) return res.mk(0, 'Invalid body of Task!');

  const sql = `
    INSERT INTO tasks (user_id, title, description)
    VALUES (?, ?, ?)
  `;

  const sqlParams = [userId, title, description ?? ''];

  dbConn.query(sql, sqlParams, (err, { insertId }) => {
    if (err) return res.mk(0);

    res.mk(1, null, { taskId: insertId });
  });
};

module.exports = create;

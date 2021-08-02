const readUser = (req, res) => {
  const { userId } = req;

  const sql = `
    SELECT id, username, date_joined
    FROM users
    WHERE id = ?
  `;

  conn.query(sql, [userId], (err, [user]) => {
    if (err) return res.mk(0);

    res.mk(1, null, user);
  });
};

module.exports = readUser;

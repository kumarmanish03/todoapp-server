const read = (req, res) => {
  const { userId, dbConn } = req;

  const sql = `
    SELECT id, username, date_joined
    FROM users
    WHERE id = ?
  `;

  dbConn.query(sql, [userId], (err, results) => {
    if (err) return res.mk(0);

    const [user] = results;
    res.mk(1, null, user);
  });
};

module.exports = read;

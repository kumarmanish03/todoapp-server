require('dotenv').config();

const jwt = require('jsonwebtoken');

const PRIV_KEY = process.env.PRIV_KEY;

const validateLogin = (req, res, next) => {
  const { dbConn } = req;
  const { loginToken } = req.cookies;

  if (!loginToken) return res.mk(0, 'You are not logged in!');

  const { userId } = jwt.verify(loginToken, PRIV_KEY);

  if (typeof userId !== 'number') return res.mk(0, 'Invalid login token!');

  const sql = `
    SELECT COUNT(*) as user_exists
    FROM users
    WHERE id = ?
  `;

  dbConn.query(sql, [userId], (err, [{ user_exists }]) => {
    if (err) return res.mk(0);
    if (!user_exists) return res.mk(0, 'Invalid login!');

    req.userId = userId;
    next();
  });
};

module.exports = validateLogin;

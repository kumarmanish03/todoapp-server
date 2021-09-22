require('dotenv').config();

const { ERR_LOGIN, ERR_LOGIN_TOKEN, ERR_LOGIN_INVALID } = require('../consts');

const jwt = require('jsonwebtoken');

const PRIV_KEY = process.env.PRIV_KEY;

const validateLogin = (req, res, next) => {
  const { dbConn } = req;
  const { loginToken } = req.query;

  if (!loginToken) return res.mk(0, ERR_LOGIN);

  const { userId } = jwt.verify(loginToken, PRIV_KEY);

  if (typeof userId !== 'number') {
    return res.mk(0, ERR_LOGIN_TOKEN);
  }

  const sql = `
    SELECT COUNT(*) as user_exists
    FROM users
    WHERE id = ?
  `;

  dbConn.query(sql, [userId], (err, results) => {
    if (err) return res.mk(0);

    const [{ user_exists }] = results;

    if (!user_exists) {
      return res.mk(0, ERR_LOGIN_INVALID);
    }

    req.userId = userId;
    next();
  });
};

module.exports = validateLogin;

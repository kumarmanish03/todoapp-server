require('dotenv').config();

const {
  ERR_USERNAME_INVALID,
  ERR_PASSWORD_INVALID,
  ERR_USERNAME_TAKEN,
} = require('../../consts');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIV_KEY = process.env.PRIV_KEY;

const signup = (req, res) => {
  const { dbConn } = req;
  const { username, password } = req.body;

  if (!/^\w{6,20}$/.test(username)) return res.mk(0, ERR_USERNAME_INVALID);
  if (!/^.{8,}$/.test(password)) return res.mk(0, ERR_PASSWORD_INVALID);

  const sql = `
    SELECT COUNT(*) as user_exists
    FROM users
    WHERE username = ?
  `;

  dbConn.query(sql, [username], (err, results) => {
    if (err) return res.mk(0);

    const [{ user_exists }] = results;
    if (user_exists) return res.mk(0, ERR_USERNAME_TAKEN);

    const hashedPass = bcrypt.hashSync(password, SALT_ROUNDS);

    const sql = `
      INSERT INTO users (username, password)
      VALUES (?, ?)
    `;

    dbConn.query(sql, [username, hashedPass], (err, results) => {
      if (err) return res.mk(0);

      const { insertId } = results;
      const token = jwt.sign({ userId: insertId }, PRIV_KEY);

      res.cookie('loginToken', token, {
        httpOnly: true,
        secure: !req.devEnv,
      });

      res.mk(1);
    });
  });
};

module.exports = signup;

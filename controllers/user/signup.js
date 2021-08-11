require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIV_KEY = process.env.PRIV_KEY;

const signup = (req, res) => {
  const { dbConn } = req;
  const { username, password } = req.body;

  if (!/^\w{6,20}$/.test(username)) return res.mk(0, 'Enter a valid Username!');
  if (!/^.{8,}$/.test(password)) return res.mk(0, 'Enter a valid Password!');

  const sql = `
    SELECT COUNT(*) as user_exists
    FROM users
    WHERE username = ?
  `;

  dbConn.query(sql, [username], (err, [{ user_exists }]) => {
    if (err) return res.mk(0);
    if (user_exists) return res.mk(0, 'Username already taken!');

    const hashedPass = bcrypt.hashSync(password, SALT_ROUNDS);

    const sql = `
      INSERT INTO users (username, password)
      VALUES (?, ?)
    `;

    dbConn.query(sql, [username, hashedPass], (err, { insertId }) => {
      if (err) return res.mk(0);

      const token = jwt.sign({ userId: insertId }, PRIV_KEY);
      res.cookie('loginToken', token);
      res.mk(1);
    });
  });
};

module.exports = signup;

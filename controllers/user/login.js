require('dotenv').config();

const { ERR_USERNAME_NOT_FOUND, ERR_CREDS_UNMATCHED } = require('../../consts');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PRIV_KEY = process.env.PRIV_KEY;

const login = (req, res) => {
  const { dbConn } = req;
  const { username, password } = req.body;

  const sql = `
    SELECT id, password
    FROM users
    WHERE username = ?
  `;

  dbConn.query(sql, [username], (err, results) => {
    if (err) return res.mk(0);

    const [user] = results;
    if (!user) return res.mk(0, ERR_USERNAME_NOT_FOUND);

    const passMatched = bcrypt.compareSync(password, user.password);

    if (!passMatched) return res.mk(0, ERR_CREDS_UNMATCHED);

    const token = jwt.sign({ userId: user.id }, PRIV_KEY);

    res.mk(1, null, { loginToken: token });
  });
};

module.exports = login;

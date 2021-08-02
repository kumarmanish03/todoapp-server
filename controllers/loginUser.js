require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PRIV_KEY = process.env.PRIV_KEY;

const loginUser = (req, res) => {
  const { dbConn } = req;
  const { username, password } = req.body;

  const sql = `
    SELECT id, password
    FROM users
    WHERE username = ?
  `;

  dbConn.query(sql, [username], (err, [user]) => {
    if (err) return res.mk(0);
    if (!user) return res.mk(0, 'Username does not exist!');

    const passMatched = bcrypt.compareSync(password, user.password);

    if (!passMatched) return res.mk(0, 'Username and Password does not match!');

    const token = jwt.sign({ id: user.id }, PRIV_KEY);
    res.cookie('loginToken', token);
    res.json(mkRes(1));
  });
};

module.exports = loginUser;

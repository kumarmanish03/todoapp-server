require('dotenv').config();

const mysql = require('mysql');
const jsonRes = require('../utils/jsonRes');

const mkDbConn = (req, res, next) => {
  const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_NAME,
    port: process.env.MYSQL_PORT || 3306,
  });

  let connErr = false;
  conn.connect(err => (connErr = err));
  if (connErr) return jsonRes.err(res);

  req.dbConn = conn;
  next();
};

exports = mkDbConn;

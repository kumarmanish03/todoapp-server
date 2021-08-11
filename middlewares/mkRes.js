const mkRes = (req, res, next) => {
  res.mk = (ok = 1, msg = null, data = null) => {
    req.dbConn && req.dbConn.end();
    return res.json({ ok, msg, data });
  };

  next();
};

module.exports = mkRes;

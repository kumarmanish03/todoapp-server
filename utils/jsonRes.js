const jsonRes = (req, res, next) => {
  /**
   * Disconnects from Database and sends JSON response.
   * @param {0|1} ok
   * @param {string} msg
   * @param {any} data
   */
  res.mk = (ok = 1, msg = null, data = null) => {
    req.dbConn && req.dbConn.end();
    return res.json({ ok, msg, data });
  };

  next();
};

module.exports = jsonRes;

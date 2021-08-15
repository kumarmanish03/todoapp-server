const logout = (req, res) => {
  res.clearCookie('loginToken', {
    httpOnly: true,
    sameSite: req.devEnv ? true : 'none',
    secure: !req.devEnv,
  });

  res.mk(1);
};

module.exports = logout;

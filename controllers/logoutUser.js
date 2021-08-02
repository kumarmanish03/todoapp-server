const logoutUser = (_, res) => {
  res.clearCookie('loginToken');
  res.mk(1);
};

module.exports = logoutUser;

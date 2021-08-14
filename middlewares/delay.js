require('dotenv').config();

const DELAY = +process.env.DELAY || 0;

const delay = (_, __, next) => {
  setTimeout(() => {
    next();
  }, DELAY);
};

module.exports = delay;

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const delay = require('./middlewares/delay');
const mkRes = require('./middlewares/mkRes');

const corsConfig = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, _, next) => {
  req.devEnv = app.get('env') === 'development';
  next();
});

app.use(delay);
app.use(mkRes);

const userRouter = require('./routers/user');
const tasksRouter = require('./routers/tasks');

app.use('/user', userRouter);
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send(`Welcome to NTasks-Advanced API! (${req.devEnv ? 'dev' : 'prod'})`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NTasks-Advanced Server started at PORT:${PORT}...`);
});

const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jsonRes = require('./utils/jsonRes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jsonRes);

app.use('/api/user', require('./routers/user'));
app.use('/api/todos', require('./routers/todos'));

app.get('/', (_, res) => {
  res.send('Welcome to nTasks-Advanced API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at Port:${PORT}...`));

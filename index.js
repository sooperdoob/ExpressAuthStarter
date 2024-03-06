const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static('public'));

// Register route
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const result = await userController.registerUser(username, password);
  return res.status(result.error ? 400 : 201).json(result);
});

// Login route
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await userController.loginUser(username, password);
  return res.status(result.error ? 401 : 200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Register route
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const result = await userController.registerUser(username, password);
  return res.status(result.error ? 400 : 201).json(result);
});

// Login route
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await userController.loginUser(username, password);
  return res.status(result.error ? 401 : 200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

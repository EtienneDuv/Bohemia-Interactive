const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const { initDb } = require('./services/databaseService')
const fs = require('fs')
const app = express();

app.set('view engine', 'ejs'); //TEMPLATE ENGINE
app.use('/', express.static('./public')) //STATICS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'testApp',
  resave: false,
  saveUninitialized: true
}));
app.use(function (req, res, next) {
  if (!fs.existsSync('./db')) {
    fs.mkdirSync('db')
    if (!fs.existsSync('./db/database.db')) initDb()
  }
  if (!req.session.data) req.session.data = [];
  if (!req.session.savedData) req.session.savedData = [];
  next();
});

//ROUTES
const controller = require('./api/routes');

//FIRE CONTROLLERS
controller(app);

//RUN
const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log(`Example app listening at http://localhost:${port}`);
});
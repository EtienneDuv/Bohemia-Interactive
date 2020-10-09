const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const session = require('express-session')
const app = express();

app.set('view engine', 'ejs'); //TEMPLATE ENGINE
app.use('/', express.static('./public')) //STATICS
app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'testApp',
  resave: false,
  saveUninitialized: true
}));
app.use(function (req, res, next) {
  res.locals.session = req.session;
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
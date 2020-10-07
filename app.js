const express = require('express');
const controller = require('./api/routes');
const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//DEFINE STATICS
app.use('/', express.static('./public'))

//FIRE CONTROLLERS
controller(app);

//RUN
const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log(`Example app listening at http://localhost:${port}`);
});
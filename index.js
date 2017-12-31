const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const config = require('config');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const env = require('dotenv').config();

const routes = require('./server');

// require('dotenv').config({ path: path.join(__dirname, 'config/.env') });

// Environment specific configuration stuff
// const conf = config.get(process.env.NODE_ENV || 'development');
//

const app = express();

// Enable CORS for local testing
app.use(cors());

// Protect the app
app.use(helmet());

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// Enable Handling of JSON data in Routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Loads up the Routes
app.use(routes);

// TEMPORARY!!!! TESTING FOR LAMBDA FUNCTIONS ONLY
// Reassigning app.locals i.e. app.locals = conf is BAD so we merge it instead
// app.locals = Object.assign({}, app.locals, conf);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

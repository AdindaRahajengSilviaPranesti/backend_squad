var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser  = require('body-parser');
const { spawn } = require('child_process');
// require('./bot/calms_bot');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inspeksiRouter = require('./routes/inspeksi');
var calibrationRouter = require('./routes/calibration');
var bpdRouter = require('./routes/bpd');
var authRouter = require('./routes/auth');
var flowReleaseRouter = require('./routes/flowRelease');
var radarvisualRouter = require('./routes/radarvisual');
var capaTrackerRouter = require('./routes/capaTracker');
var inprocesscontrollRouter = require('./routes/inprocesscontroll');
var finishGoodRouter = require('./routes/finishGood');
var redAreaRouter = require('./routes/redArea');
var genbaRouter = require('./routes/genba');




var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/inspeksi', inspeksiRouter);
app.use('/calibration', calibrationRouter);
app.use('/bpd', bpdRouter);
app.use('/flow-release', flowReleaseRouter);
app.use('/radarvisual', radarvisualRouter);
app.use('/capa-tracker', capaTrackerRouter);
app.use('/inprocess-fsb', inprocesscontrollRouter);
app.use('/finishGood', finishGoodRouter);
app.use('/red-area', redAreaRouter);
app.use('/genba', genbaRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

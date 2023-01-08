var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./lib/connectMongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adsRouter = require('./routes/apiv1/ads');

var app = express();

app.locals.title = 'Nodepop';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apiv1/anuncios', adsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(()=>{
  console.log("Servidor arrancado en puerto 3000");
})

// error handler
app.use(function(err, req, res, next) {

  if (err.array) {
    err.status = 422; // error de validacion
    const errorInfo = err.array({onlyFirstError: true})[0];
    console.log(errorInfo);
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`;
  }

  res.status(err.status || 500);

  // si el error es de una petición al API, responder con formato JSON
  if (req.originalUrl.startsWith('/apiv1/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
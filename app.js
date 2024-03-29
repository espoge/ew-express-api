var createError = require('http-errors');
var express = require('express');
var cors = require('cors');

var usersRouter = require('./routes/users');
var badgesRouter = require('./routes/badges');

var bodyParser = require('body-parser');

var app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/users', usersRouter);
app.use('/badges', badgesRouter);

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
  res.send('error');
});



app.listen(3000, function () {
    console.log('Listening on port 3000!');
  });

module.exports = app;
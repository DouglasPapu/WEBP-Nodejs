var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//Begin

cors = require('cors');
mongoose = require('mongoose');
database = require('./config/mongoose');
bodyParser = require('body-parser');

//Connection to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connected");
},
error => {
  console.log("Database couldn't be connected to: "+error);
})

const userAPI = require('./routes/user.route');


//Config express
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors());

//API
app.use('/users', userAPI);

//Port used
const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port: "+port);
});

//When occurred an error
app.use(function(err, req, res, next){
  console.log(err.message);
  if(!err.statusCode){
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message)
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

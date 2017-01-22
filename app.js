const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const {PassportOption, RedisOption, appTitle} = require('./config/app-config');
const redisStore = new RedisStore(RedisOption);
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });
passport.use(
  new TwitterStrategy(PassportOption,
    (twitter_token, twitter_token_secret, {id, photos, displayName}, done) => {
      done(null, { id, photos, displayName, twitter_token, twitter_token_secret });
    })
);

const index = require('./routes/index');
const users = require('./routes/users');
const {login} = require('./routes/login');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: redisStore,
  secret: 'nokorinanbu',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', login);
app.use('/', (req, res, next) => {
  if (!req.user) { return res.redirect('/login'); }
  next();
}, index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

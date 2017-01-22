const express = require('express');
const login = express.Router();
const passport = require('passport');

const get = (req, res) => {
  res.render('login', { title: 'e-gao' });
};

login.get('/', get);
login.get('/oauth', passport.authenticate('twitter'));
login.get('/callback',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = { login, get };

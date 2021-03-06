var express = require('express');
var passport = require('passport');
var ConnectRoles = require('connect-roles');
var Account = require('../models/account');
var DAL = require('../models/dal');
var router = express.Router();
var access = require('../access');

console.log('access......');
console.log(access);

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("request user: ", req.user);
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/myaccount', access.can('access myaccount'), function(req, res, next) {
  res.render('myaccount', { title: 'Express', user: req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, roles: ['basic'] }), req.body.password, function(err, account) {
        if (err) {
            console.log('error message: ', err.message);
            return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
          req.session.save(function (err) {
              if (err) {
                  return next(err);
              }
              res.redirect('/');
          });
        });

    });
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


module.exports = router;

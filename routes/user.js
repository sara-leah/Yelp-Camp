const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');


router.route('/register')
    .get(users.renderRegisterForm)// render register form
    .post(catchAsync(users.register));// register user

router.route('/login')
    .get(users.renderLoginForm)// render login form
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        users.login); // login user

// logout user
router.get('/logout', users.logout);

module.exports = router;
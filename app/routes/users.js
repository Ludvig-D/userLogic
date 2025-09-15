const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router
  .route('/auth/login')
  .get((req, res) => {
    res.render('login');
  })
  .post(users.loginUser);

router
  .route('/auth/signup')
  .get((req, res) => {
    res.render('signup');
  })
  .post(users.signupUser);

module.exports = router;

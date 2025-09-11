const express = require('express');
const router = express.Router();

router
  .route('/auth/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    const { username, password } = req.body;
  });

router
  .route('/auth/signup')
  .get((req, res) => {
    res.render('signup');
  })
  .post((req, res) => {
    const { username, email, password } = req.body;
  });

module.exports = router;

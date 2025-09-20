const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.route('/auth/login').get(users.loginRender).post(users.loginUser);

router.route('/auth/signup').get(users.signupRender).post(users.signupUser);

module.exports = router;

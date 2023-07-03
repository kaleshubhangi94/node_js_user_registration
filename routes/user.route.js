const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
require('dotenv').config();

// routes for user

router.post('/sign-up', userController.register);
router.post('/login', userController.login);

module.exports = router;

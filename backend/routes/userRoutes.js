const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Đăng ký
router.post('/signup', userController.insertUser);

// Đăng nhập
router.post('/login', userController.loginUser);

module.exports = router;
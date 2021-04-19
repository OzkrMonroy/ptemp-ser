const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', [
  check('email', 'Enter a valid email').isEmail(),
  check('password', 'The password must be at least six characters long.').isLength({ min: 6 })
], authController.authenticatedUser);

router.get('/', auth, authController.getUserAuthenticated);

module.exports = router;
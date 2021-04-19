const express = require('express');
const userController = require('../controllers/userController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/', [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Enter a validate email').isEmail(),
  check('password', 'The password must be six characteres long').isLength({ min: 6 })
], userController.createUser);

module.exports = router;
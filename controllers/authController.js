const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticatedUser = async (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors: errors.array()
    })
  };

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({ msg: 'The user doesn\'t exist' });
    }
    
    const correctPassword = await bcryptjs.compare(password, user.password);
    if(!correctPassword){
      return res.status(400).json({ msg: 'Password is incorrect'});
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.SECRET_WORD, {
      expiresIn: 3600
    }, (error, token) => {
      if (error) throw error

      res.json({ token });
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal Server Error'});
  }
};

exports.getUserAuthenticated = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-userPassword');
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal Server Error.' });
  }
};
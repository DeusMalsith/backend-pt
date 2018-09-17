// load environmental variables
require('dotenv').config();
// load web framework
const express = require('express');
// load token functionality for frontend/backend communciation
const jwt = require('jsonwebtoken');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

// endpoint for logging in users
router.post('/login', (req, res) => {
  // look for user in database
  db.User.findOne({ email: req.body.email })
    .then(user => {
      // check if user was found
      if (!user) {
        return res.status(400).send({ err: 'That email is not registered' });
      }
      // verify password
      if (!req.body.password || !user.authenticated(req.body.password)) {
        // password failed authentication
        return res.status(401).send({ err: 'Invalid credentials' });
      }
      // user logged in, send token
      res.status(200).send({ token: generateToken(user, 60 * 60 * 24 * 7) });
    })
    .catch(err => {
      console.log('err logging in user:', err);
      return res.status(503).send('Internal error');
    });
});

router.post('/signup', (req, res) => {
  console.log('req.body in signup is:', req.body);
  db.User.create(req.body)
    .then(newUser => {
      res.status(200).send({ token: generateToken(user, 60 * 60 * 24 * 7) });
    })
    .catch(err => {
      // TODO handle error type
      const duplicateError = /E11000/
      if (duplicateError.test(err.errmsg)) {
        console.log('email already signed up:', err);
        return res.status(503).send('Email is already used');
      }
      else {
        console.log('err signing up user:', err);
        return res.status(503).send('Internal error');
      }
    });
});

// duration is in seconds
function generateToken(user, duration) {
  const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: duration
      });
  return token;
}

module.exports = router;

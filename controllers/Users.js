const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/by/email', (req, res) => {
  db.User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (user) {
        res.status(200).send({ user });
      }
      else {
        res.status(400).send({ err: 'User not found' });
      }
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

// TODO email or id?
router.get('/prescription', (req, res) => {
  db.User.findById(req.body.id)
    .populate('prescription')
    .then(result => {
      if (result) {
        res.status(200).send({ prescription: result.prescription })
      }
      else {
        res.status(400).send({ err: 'User not found' });
      }
    })
    .catch(err => {
      console.log('err in db query:', err);
    });
});

router.get('/prescription/by/email', (req, res) => {
  db.User.find({ where: { email: req.body.email } })
    .populate('prescription')
    .then(result => {
      if (result) {
        res.status(200).send({ prescription: result.prescription })
      }
      else {
        res.status(400).send({ err: 'User not found' });
      }
    })
    .catch(err => {
      console.log('err in db query:', err);
    });
});

router.get('/clients', (req, res) => {
  db.User.find({ where: provider: req.body.id })
    .then(results => {
      if (results) {
        res.status(200).send({ clients: results });
      }
      else {
        res.status(400).send({ err: 'No clients found' });
      }
    })
    .catch(err => {
      console.log('err in db query:', err);
    });
});

module.exports = router;


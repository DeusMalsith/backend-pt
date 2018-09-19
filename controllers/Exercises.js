// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

// get all excercises
router.get('/', (req, res) => {
  db.Exercise.find({})
    .then(results => {
      res.status(200).send({ exercises: results });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

router.get('/by/name', (req, res) => {
  db.Exercise.findOne({
    where: { name: req.body.name }
  })
    .then(result => {
      res.status(200).send({ exercise: result });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

router.post('/', (req, res) => {
  db.Exercise.create(req.body)
    .then(newEx => {
      res.status(201).send({ success: 'Exercise created' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'Undocumented error' });
    });
});

module.exports = router;

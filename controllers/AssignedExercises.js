// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

router.patch('/', (req, res) => {
  db.AssignedExercise.findById(req.body.id)
    .then(target => {
      // TODO syntax
      target = new db.AssignedExercise(req.body);
      // TODO handle error?
      target.save();
      res.status(200).send('Successfully updated assignment');
    })
    .catch(err => {
      res.status(503).send({ err: 'database err' });
    });
});

module.exports = router;

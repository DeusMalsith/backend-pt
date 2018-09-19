// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

// NOTE provider and client access (unqiue providers & clients)
router.get('/', (req, res) => {
  db.Comment.find({
    where: { client: req.body.id }
  })
    .then(results => {
      res.status(200).send({ comments: results });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

// NOTE client only
router.post('/', (req, res) => {
  db.Comment.create(req.body)
    .then(newEx => {
      res.status(201).send({ success: 'Comment created' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'Undocumented error' });
    });
});

module.exports = router;

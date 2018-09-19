/* Excercises are the core content of the app. Each exercise has an
 * instructional video and may have accompanying general instructions (these
 * instructions would be available to all clients) */
// ORM
const mongoose = require('mongoose');

// NOTE this is an embedded document because i expect expansion
const instructionsSchema = new mongoose.Schema({
  text: String
});

const exerciseSchema = new mongoose.Schema({
  video: { // TODO validate url
    type: String,
    required: true
  },
  name: String,
  instructions: instructionsSchema
});

module.exports = mongoose.model('Exercise', exerciseSchema);

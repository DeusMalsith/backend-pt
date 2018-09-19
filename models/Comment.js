/* A comment is a single piece of feedback, by the client, to the provider. It
 * is associated with an individual excercise that was assigned to the client.
 * */
// ORM
const mongoose = require('mongoose');

// TODO validations (comfort & completness sacle)
const feedbackSchema = new mongoose.Schema({
  comfort: Number,
  completeness: Number,
  text: String
});

const commentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedExcercise: { type: mongoose.Schema.Types.ObjectId,
    ref: 'AssignedExcercise' },
  date: { type: Date, default: Date.now },
  feedback: feedbackSchema
});

module.exports = mongoose.model('Comment', commentSchema);

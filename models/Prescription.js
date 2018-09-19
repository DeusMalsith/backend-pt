/* A prescription is a record of a single assignment of excercises to be
 * performed. It is a representation of a real world prescription written by
  * a provider to their client. */

// ORM
const mongoose = require('mongoose');

const presciptionSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedExercises: [{ type: mongoose.Schema.Types.ObjectId,
    ref: 'AssignedExcercise' }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', presciptionSchema);

// TODO add a hook to update User model

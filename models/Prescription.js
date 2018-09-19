// ORM
const mongoose = require('mongoose');

const presciptionSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedExcercises: [{ type: mongoose.Schema.Types.ObjectId,
    ref: 'AssignedExcercise' }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', presciptionSchema);

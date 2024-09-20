const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  location: { type: String, required: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of User IDs
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],  // Array of Event IDs
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

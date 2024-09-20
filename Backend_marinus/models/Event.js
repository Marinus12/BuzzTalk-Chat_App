const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },  // The group that hosts the event
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Array of User IDs attending the event
  date: { type: Date, required: true }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

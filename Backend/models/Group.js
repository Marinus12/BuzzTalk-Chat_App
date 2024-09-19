const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Group Schema
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: String, // User IDs of group members
    required: true
  }]
});

module.exports = mongoose.model('Group', GroupSchema);

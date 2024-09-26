import mongoose from 'mongoose';

// Room Schema
const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['public', 'private'], required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.model('Room', RoomSchema);

export default Room;

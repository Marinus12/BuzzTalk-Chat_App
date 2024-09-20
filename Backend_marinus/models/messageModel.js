import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true }, // Room or Group ID
  sender: { type: String, required: true }, // User ID of the sender
  message: { type: String, required: true }, // Message content
  timestamp: { type: Date, default: Date.now }, // Timestamp
});

// Ensure message timestamps update when saved
messageSchema.pre('save', function (next) {
  this.timestamp = Date.now();
  next();
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Message content
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID of the sender
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID of the receiver
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: false }, // Reference to the community (optional)
  roomId: { type: String, required: false }, // Room or Group ID (optional)
  timestamp: { type: Date, default: Date.now }, // Timestamp
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
messageSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;

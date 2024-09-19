import express from 'express';
import { getChatMessages, getUserRooms } from '../controllers/chatController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Fetch chat messages for a private or group room
router.get('/messages/:roomId', verifyToken, getChatMessages);

// Optionally, get chat rooms for the user
router.get('/user/rooms', verifyToken, getUserRooms);

export default router;

import express from 'express';
import { createRoom } from '../controllers/roomController.js';
import { verifyToken } from '../middleware/auth.js';  // Use named import for verifyToken

const router = express.Router();

// POST request to create a room
router.post('/', verifyToken, createRoom);  // Use verifyToken middleware

export default router;

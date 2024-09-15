import express from 'express';
import { getAllMessages, getMessageById, createMessage, updateMessage, deleteMessage } from '../controllers/MessageController.js';

const router = express.Router();

// Route to get all messages
router.get('/', getAllMessages);

// Route to get a message by ID
router.get('/:id', getMessageById);

// Route to create a new message
router.post('/', createMessage);

// Route to update a message by ID
router.put('/:id', updateMessage);

// Route to delete a message by ID
router.delete('/:id', deleteMessage);

export default router;

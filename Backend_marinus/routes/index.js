import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import messageRoutes from './messageRoutes.js';
import communityRoutes from './communityRoutes.js';
import eventRoutes from './eventRoutes.js';
import roomRoutes from './roomRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/communities', communityRoutes);
router.use('/events', eventRoutes);
router.use('/rooms', roomRoutes);  // Add room routes

export default router;

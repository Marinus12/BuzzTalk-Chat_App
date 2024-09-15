import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import messageRoutes from './messageRoutes.js';
import communityRoutes from './communityRoutes.js';
import eventRoutes from './eventRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/communities', communityRoutes);
router.use('/events', eventRoutes);

export default router;

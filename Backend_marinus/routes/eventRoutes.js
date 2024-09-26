import express from 'express';
import { fetchEvents } from '../controllers/eventController.js';

const router = express.Router();

// Add logging for when the route is accessed
router.get('/events', (req, res, next) => {
  console.log('GET /api/events route hit');
  next();
}, fetchEvents);

export default router;

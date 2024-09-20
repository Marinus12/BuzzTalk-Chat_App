import express from 'express';
import { createCommunity, getAllCommunities, getCommunityById, updateCommunity, deleteCommunity } from '../controllers/CommunityController.js';

const router = express.Router();

// Define routes
router.post('/', createCommunity);
router.get('/', getAllCommunities);
router.get('/:id', getCommunityById);
router.put('/:id', updateCommunity);
router.delete('/:id', deleteCommunity);

export default router;

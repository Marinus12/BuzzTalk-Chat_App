import express from 'express';
import * as UserController from '../controllers/UserController.js';

const router = express.Router();

// Route to get all users
router.get('/', UserController.getAllUsers);

// Route to get a user by ID
router.get('/:id', UserController.getUserById);

// Route to create a new user
router.post('/', UserController.createUser);

// Route to update a user by ID
router.put('/:id', UserController.updateUser);

// Route to delete a user by ID
router.delete('/:id', UserController.deleteUser);

export default router;

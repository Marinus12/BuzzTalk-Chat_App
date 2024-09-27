import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Helper function for email format validation
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Helper function for password complexity validation
const validatePasswordComplexity = (password) => {
  const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return complexityRegex.test(password);
};

// Register a new user
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Email format validation
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password complexity validation
    if (!validatePasswordComplexity(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character' });
    }

    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user document
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for authentication
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.SESSION_DURATION });

    // Return the generated token
    res.status(201).json({ token });
  } catch (err) {
    // Handle duplicate email error (error code E11000 for MongoDB unique constraint)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the authenticated user
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.SESSION_DURATION });

    // Return the generated token
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all users (for testing purposes)
export const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();
    
    // Send the list of users as a JSON response
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

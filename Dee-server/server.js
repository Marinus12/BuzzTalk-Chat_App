const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Message = require('./models/Message'); // Import the message model

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this to match your frontend's URL
    methods: ["GET", "POST"],
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

  // Define a basic route for the root path
app.get('/', (req, res) => {
  res.send('Hello! The server is up and running.');
});

// Route for registering a new user
app.post('/register', async (req, res) => {
  const { username, email, password, location, countryCode, phoneNumber } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      location,
      countryCode,
      phoneNumber
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/register', (req, res) => {
  res.send('Registration route is working!');
});


// Route for logging in
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        location: user.location,
        countryCode: user.countryCode,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/login', (req, res) => {
  res.send('Login route is working!');
});


// Handle user connection and messages
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

   // Load old messages from the database and emit them to the client
   Message.find().sort({ timestamp: 1 }).limit(50) // Load last 50 messages
   .then(messages => {
     socket.emit('load_old_messages', messages); // Send old messages to the client
   })
   .catch(err => console.error('Error loading old messages:', err));



// Handle receiving a message from a client
socket.on('chat', async (message, callback) => {
  // console.log('Message received from client:', message);

  // Debugging: Print the entire message object
  // console.log('Received message object:', JSON.stringify(message, null, 2));

  // Ensure that the required fields are present and correctly formatted
  if (!message || typeof message !== 'object') {
    console.error('Invalid message format received:', message);
    if (callback) callback({ error: 'Invalid message format' });
    return;
  }

  // Check the exact field values before saving to the database
  const { user, message: msgContent, avatar } = message;
  // console.log('Extracted fields -> user:', user, 'message:', msgContent, 'avatar:', avatar);

  // Confirm that 'user' and 'message' fields are present, allowing 'avatar' to be null or optional
  if (!user || !msgContent) {
    console.error('Missing required fields in message:', { user, message: msgContent, avatar });
    if (callback) callback({ error: 'User and message fields are required' });
    return;
  }

  try {
    // Save the message to the database
    const newMessage = new Message({
      user: user,
      message: msgContent, // Ensure the correct field is being saved
      avatar: avatar || '' // If avatar is null, default it to an empty string
    });

    await newMessage.save();

    console.log('Message successfully saved:', newMessage);

    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit('chat', {
      user: user,
      message: msgContent,
      avatar: avatar
    });


    if (callback) callback({ success: true });
  } catch (error) {
    console.error('Error saving message to database:', error);
    if (callback) callback({ error: 'Failed to save message' });
  }
});


  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server and Socket.IO running on port ${PORT}`);
});

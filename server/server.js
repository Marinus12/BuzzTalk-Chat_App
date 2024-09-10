// server/server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your React app's URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

let users = {}; // To keep track of connected users and their tokens

// Handle user connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('authenticate', (token) => {
    users[socket.id] = token;
    console.log('User authenticated with token:', token);
  });

  // Handle receiving a message from a client
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);

    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    delete users[socket.id];
  });
});

// Serve the application
app.get('/', (req, res) => {
  res.send('BuzzTalk server is running.');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import io from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

// Replace with your server's URL
const socket = io('http://localhost:5000', {
  auth: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmViZWY2MmJlOTlhZWFkMzc4ZjBhYjYiLCJpYXQiOjE3MjY3NDA5MjksImV4cCI6MTcyNjc0MDkzMn0.LYmgeRw13H0nR8K_UdluMBYSBPbuUBSgj4u5j66w9_8'
  }
});

socket.on('connect', () => {
  console.log('Connected to server');

  // Join private room
  socket.emit('joinPrivateRoom', 'privateRoom1');
  
  // Join group room
  socket.emit('joinGroupRoom', 'groupRoom1');

  // Send a private message
  socket.emit('privateMessage', { roomId: 'privateRoom1', message: 'Hello Private Room!' });

  // Send a group message
  socket.emit('groupMessage', { groupId: 'groupRoom1', message: 'Hello Group Room!' });

  // Listen for new private messages
  socket.on('newPrivateMessage', (msg) => {
    console.log('New Private Message:', msg);
  });

  // Listen for new group messages
  socket.on('newGroupMessage', (msg) => {
    console.log('New Group Message:', msg);
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

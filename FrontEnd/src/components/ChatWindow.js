// src/components/ChatWindow.js

import React, { useState, useEffect } from 'react';

const ChatWindow = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>BuzzTalk</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '10px 0' }}>
            {msg}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '10px', width: '80%' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

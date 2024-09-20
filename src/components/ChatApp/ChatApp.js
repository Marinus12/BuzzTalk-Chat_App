import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './ChatApp.css';

const socket = io('http://localhost:5000'); // Adjust the URL to match your backend

const ChatApp = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load previous messages
    socket.on('load messages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Listen for new messages
    socket.on('new message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
        axios
          .post(
            'http://localhost:5000/api/send-message',
            { message: input },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setInput('');
          })
          .catch((error) => {
            console.error('Error sending message:', error);
          });
    }
};


  // const sendMessage = () => {
  //   if (input.trim()) {
  //     axios
  //       .post(
  //         'http://localhost:5000/api/send-message',
  //         { message: input },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         setInput('');
  //       });
  //   }
  // };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>BuzzTalk</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender === 'You' ? 'own-message' : ''}`}>
            <div className="message-sender">{message.sender}</div>
            <div className="message-text">{message.text}</div>
            <div className="message-timestamp">{new Date(message.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;

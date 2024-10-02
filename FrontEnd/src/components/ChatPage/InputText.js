import { useState } from 'react';
import React from 'react';
import './InputText.css';

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState('');

  function addAMessage() {
    if (message.trim()) {
      // Change this to pass only the string `message`
      addMessage(message);  // Pass `message` directly instead of an object
      setMessage('');  // Clear the message input after sending
    }
  }

   // Function to handle key press events in the textarea
   const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior of newline on Enter
      addAMessage(); // Call the addAMessage function when Enter is pressed
    }
  };

  return (
    <div className='textContainer'>
      <textarea
        rows={6}
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress} // Detect Enter key press
      />
      <button onClick={addAMessage}>
        SEND
      </button>
    </div>
  );
};

export default InputText;

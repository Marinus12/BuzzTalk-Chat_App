import { useState } from 'react';
import React from 'react';
import './InputText.css';

const InputText = ({ addMessage }) => {  // Destructure addMessage from props

    const [message, setMessage] = useState('');

    function addAMessage() {
        if (message.trim()) {  // Ensure that empty messages are not sent
            addMessage({
                message
            });
            setMessage('');  // Clear the message input after sending
        }
    }

    return (
        <div className='textContainer'>
            <textarea
                rows={6}
                placeholder="Type your message"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button
                onClick={addAMessage}  // Invoke the function directly here
            >
                SEND
            </button>
        </div>
    );
}

export default InputText;

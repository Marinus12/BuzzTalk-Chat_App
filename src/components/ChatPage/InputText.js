import { useState } from 'react';
import React from 'react';
import './InputText.css';

const InputText = (addMessage) => {

        const [ message, setMessage] = useState('')

        function addAMessage() {
            addMessage({
                message
            })
            setMessage('')
        }

    return (
        <div className='textContainer'>
            <textarea
            rows={6}
            placeholder="Type your message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            >

            </textarea>
            <button
            onClick={() => addAMessage}
            >
                Send
            </button>
        </div>
    );
}

export default InputText;

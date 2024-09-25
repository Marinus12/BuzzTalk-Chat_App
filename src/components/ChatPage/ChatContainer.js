import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import LoginPage from '../Loginpage/Loginpage';
import './ChatContainer.css';
import ChatBoxReceiver from './ChatBoxReceiver';
import ChatBoxSender from './ChatBoxSender';
import InputText from './InputText';

const ChatContainer = () => {
    // Retrieve user from localStorage and parse it if it's a JSON string
    const storedUser = localStorage.getItem("user");
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser).username : null);
    const [chats, setChats] = useState([]);
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize socket connection
        const socketio = socketIOClient("http://localhost:5000");

        // Handle connection error
        socketio.on('connect_error', (err) => {
            console.error('Socket.IO connection error:', err);
        });

        setSocket(socketio);

        // Listen for 'chat' events from the server
        socketio.on('chat', (message) => {
            console.log('Message received from server:', message);
            setChats((prevChats) => [...prevChats, message]);
        });

        // Cleanup on unmount
        return () => {
            socketio.disconnect();
        };
    }, []);

    function sendChatToSocket(chat) {
        if (socket) {
            console.log('Sending message to server:', chat);
            socket.emit('chat', chat, (ack) => {
                if (ack) {
                    console.log('Message acknowledged by server:', ack);
                }
            });
        } else {
            console.error('Socket is not initialized');
        }
    }

    function addMessage(chatText) {
        const newChat = {
            user,
            message: chatText,
            avatar
        };
        setChats((prevChats) => [...prevChats, newChat]);
        sendChatToSocket(newChat);
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("avatar");
        setUser(null);
    }

    function ChatsList() {
        return chats.map((chat, index) => (
            chat.user === user ?
                <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user} /> :
                <ChatBoxReceiver key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
        ));
    }

    return (
        <div>
            {user ?
                <div>
                    <div className='Header'>
                        <div className="user-info">
                            <h4>User: {user}</h4> {/* Display user info */}
                        </div>
                        <div className="logout-container">
                            <h4 className='logout' onClick={logout}>Log Out</h4> {/* Move logout button to the right */}
                        </div>
                    </div>
                    <ChatsList />
                    <InputText addMessage={addMessage} />
                </div>
                :
                <LoginPage setUser={setUser} />
            }
        </div>
    );
}

export default ChatContainer;

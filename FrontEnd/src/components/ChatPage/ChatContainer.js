import React, { useState, useEffect, useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import LoginPage from '../Loginpage/Loginpage';
import './ChatContainer.css';
import ChatBoxReceiver from './ChatBoxReceiver';
import ChatBoxSender from './ChatBoxSender';
import InputText from './InputText';

const ChatContainer = () => {
    // Retrieve user from localStorage and parse it if it's a JSON string
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser).username : null);
    const [chats, setChats] = useState([]);
    const [avatar] = useState(localStorage.getItem("avatar"));
    const [socket, setSocket] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [message, setMessage] = useState("");

    // Reference for the last message element
    const lastMessageRef = useRef(null);

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
            console.log("Received message from server:", message);
            setChats((prevChats) => [...prevChats, message]);
        });

        // Load old messages when the user connects
        // socketio.on('load_old_messages', (oldMessages) => {
        //     setChats(oldMessages);
        // });

    //     return () => {
    //         socketio.off('chat');
    //         socketio.off('load_old_messages');
    //     };
    // }, []);

        // Clean up function to avoid multiple listeners
        return () => {
            socketio.off('chat');  // Remove the 'chat' event listener
            socketio.disconnect(); // Properly disconnect the socket
        };
    }, []);

        // Scroll to the last message when chats are updated
        useEffect(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, [chats]);

    function sendChatToSocket(chatText) {
        if (socket) {
            const newChat = {
                user,
                message: chatText.message,
                avatar
            };

            // Send the chat message to the server
            socket.emit('chat', newChat, (ack) => {
                if (ack) {
                    console.log('Message acknowledged by server:', ack);
                }
            });

            // Optimistically update the chat in the UI
            setChats((prevChats) => [...prevChats, newChat]);
        } else {
            console.error('Socket is not initialized');
        }
    }


    function addMessage(chatText) {
        if (typeof chatText === 'string' && chatText.trim()) {
          const newMessage = {
            user,
            message: chatText, // Pass the message content as a string
            avatar
          };

          sendChatToSocket(newMessage); // Send the structured message object to the server
          setMessage(''); // Clear the message input after sending
        } else {
          console.error("Invalid message format. Please pass a string.");
        }
      }



    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("avatar");
        setUser(null);
        navigate('/login');
    }


    // function ChatsList() {
    //     return chats.map((chat, index) => {
    //         const messageText = chat.message.message; // Access the nested 'message' field
    //         return chat.user === user ?
    //             <ChatBoxSender key={index} message={messageText} avatar={chat.avatar} user={chat.user} /> :
    //             <ChatBoxReceiver key={index} message={messageText} avatar={chat.avatar} user={chat.user} />;
    //     });
    // }

    function ChatsList() {
        console.log("Current chats:", chats); // Log the chats array
        return chats.map((chat, index) => {
            return (
                <div
                key={index}
                ref={index === chats.length - 1 ? lastMessageRef : null} // Set ref for the last message
                >
                    {chat.user === user ? (
                        <ChatBoxSender  message={chat.message} avatar={chat.avatar} user={chat.user} />
                    ) : (
                        <ChatBoxReceiver  message={chat.message} avatar={chat.avatar} user={chat.user} />
                    )}
                </div>
            );
        });
    }

    return (
        <div className="chat-container">
            {user ? (
                <div>
                    <div className='Header'>
                        <div className="user-info">
                            <h4>User: {user}</h4>
                        </div>
                        <div className="logout-container">
                            <h4 className='logout' onClick={logout}>Log Out</h4>
                        </div>
                    </div>
                    <div className="chat-content">
                        <ChatsList />
                    </div>
                    <div className="input-container">
                        <InputText addMessage={addMessage} />
                    </div>
                </div>
            ) : (
                <LoginPage setUser={setUser} />
            )}
        </div>
    );
};


export default ChatContainer;

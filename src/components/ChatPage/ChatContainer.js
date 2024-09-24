import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import LoginPage from '../Loginpage/Loginpage';
import './ChatContainer.css';
import ChatBoxReceiver from './ChatBoxReceiver'
import ChatBoxSender from './ChatBoxSender'
import InputText from './InputText';

const ChatContainer = () => {

    let socketio = socketIOClient("http://localhost:5000")

    const [chats, setChats] = useState([])
    const [user, setUser] = useState(localStorage.getItems("user"))
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar"))

    useEffect(() => {
        socketio.on('chat', senderChats => {
            setChats(senderChats)
        });
    });

    function sendChatToSocket(chat) {
        socketio.emit('chat', chat)
    }

    function addMessage(chat) {
        const newchat = {...chats, user, avatar}
        setChats([...chats , newchat])
        sendChatToSocket([...chats , newchat])
    }

    function logout (){
        localStorage.removeItem("user")
        localStorage.removeItem("avatar")
    }


    function ChatsList() {
        return chats.map((chat, index) => {
            if (chat.user === user)
                return <ChatBoxSender key={index} message={chat.mesage} avatar={chat.avatar} user={chat.user} />
            return <ChatBoxReceiver key={index} message={chat.mesage} avatar={chat.avatar} user={chat.user} />
        })
    }


    return (
        <div>
            {
            user ?
            <div>
                <div className='Header'>
                    <h4 className='logout'
                    onClick={() => logout()}
                    >
                        Log Out
                    </h4>
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

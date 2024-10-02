import React from 'react';
// import ChatBoxReceiver from '../ChatPage/ChatBoxReceiver';
// import ChatBoxSender from '../ChatPage/ChatBoxSender';
import "./ChatApp.css";
// import InputText from '../ChatPage/InputText';
import ChatContainer from '../ChatPage/ChatContainer';


const ChatApp = () => {
  return (
    <div className='All'>
      {/* <h1 className='Heading'>BUZZTALK</h1> */}
      <ChatContainer />
    </div>
  );
}

export default ChatApp;


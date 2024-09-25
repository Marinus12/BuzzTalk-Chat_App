import React from 'react';
import {Avatar, Image} from 'antd';
import './ChatBoxSender.css';

const ChatBoxSender = ({avatar, user, message }) => {
  return (
    <div className='SenderBox'>
      <Avatar
      size={50}
      src={<Image
            src={avatar}
            style={{
              objectFit: 'cover',
              width: 45,
              height: 45,
              borderRadius: "100%"
            }}
            preview={false}
        />}
      />

      <p className='SendPara'>
        <strong>
          {user}
        </strong>
        <br></br>
        {message}
      </p>
    </div>
  );
}

export default ChatBoxSender;

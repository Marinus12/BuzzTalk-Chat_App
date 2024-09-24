import React from 'react';
import {Avatar, Image} from 'antd';
import './ChatBoxReceiver.css';

const ChatBoxReceiver = ({avatar, user, message }) => {
  return (
    <div className='RecvBox'>
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

      <p>
        <strong>
          {user}
        </strong>
        <br></br>
        {message}
      </p>
    </div>
  );
}

export default ChatBoxReceiver;

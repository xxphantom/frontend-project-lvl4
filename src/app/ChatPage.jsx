import React from 'react';
import ChannelsList from '../features/channels/ChannelsList.jsx';
import MessagesList from '../features/messages/MessagesList.jsx';
import useFetchChatContent from '../hooks/useFetchChatContent.js';

const ChatPage = () => {
  useFetchChatContent();
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList />
        <MessagesList />
      </div>
    </div>
  );
};

export default ChatPage;

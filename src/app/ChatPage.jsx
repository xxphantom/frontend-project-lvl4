import React from 'react';
import { useSelector } from 'react-redux';
import ChannelsList from '../features/channels/ChannelsList.jsx';
import MessagesList from '../features/messages/MessagesList.jsx';
import { selectChannelById, selectAllChannels } from '../features/channels/channelsSlice.js';
import { selectCurrentMessages } from '../features/messages/messagesSlice.js';
import useChat from '../hooks/useChat.js';

const ChatPage = () => {
  useChat();
  const currentChId = useSelector((state) => state.channelsInfo.currentChannelId);
  const currentChannel = useSelector((state) => selectChannelById(state, currentChId));
  const currentMessages = useSelector(selectCurrentMessages);
  const allChannels = useSelector(selectAllChannels);
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList currentChannelId={currentChId} channels={allChannels} />
        <MessagesList
          currentChannelId={currentChId}
          currentChannel={currentChannel}
          messages={currentMessages}
        />
      </div>
    </div>
  );
};

export default ChatPage;

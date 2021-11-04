import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import AddMessage from './AddMessage.jsx';
import { selectCurrentChannel } from '../channels/channelsSlice';
import { selectCurrentMessages } from './messagesSlice.js';

const MessagesList = () => {
  const currentChannel = useSelector(selectCurrentChannel);
  const messages = useSelector(selectCurrentMessages);
  const lastMessageEl = useRef(null);
  const channelName = currentChannel.name;
  const messagesCount = messages.length;

  useEffect(() => {
    lastMessageEl.current?.scrollIntoView();
  }, [messages]);

  const renderMessage = (message, index) => {
    const isLastMessage = messagesCount === (index + 1);
    const ref = isLastMessage ? lastMessageEl : null;
    return (
      <div ref={ref} key={message.id} className="text-break mb-2">
        <b>{message.username}</b>
        {': '}
        {message.body}
      </div>
    );
  };

  const renderChannelLabel = () => (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {`# ${channelName}` }
        </b>
      </p>
      <span className="text-muted">
        {`${messagesCount} сообщений`}
      </span>
    </div>
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {renderChannelLabel()}
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map(renderMessage)}
        </div>
        <AddMessage />
      </div>
    </div>
  );
};

export default MessagesList;

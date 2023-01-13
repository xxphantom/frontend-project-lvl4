import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../redux/slices';
import MessageForm from './MessageForm.jsx';

const MessagesList = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(selectors.channels.currentChannel);
  const messages = useSelector(selectors.messages.currentMessages);
  const lastMessageEl = useRef(null);
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
          {currentChannel ? `# ${currentChannel.name}` : null}
        </b>
      </p>
      <span className="text-muted">
        {t('messagesList.messages', { count: messagesCount })}
      </span>
    </div>
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {renderChannelLabel()}
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages ? messages.map(renderMessage) : null}
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default MessagesList;

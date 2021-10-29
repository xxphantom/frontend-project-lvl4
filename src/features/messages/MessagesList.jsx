import React, { useEffect, useRef } from 'react';

const MessagesList = ({ messages = [] }) => {
  const lastMessageEl = useRef(null);
  useEffect(() => {
    lastMessageEl.current?.scrollIntoView();
  }, [messages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map((message, index) => {
        const isLastMessage = messages.length === (index + 1);
        const ref = isLastMessage ? lastMessageEl : null;
        return (
          <div ref={ref} key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            {': '}
            {message.body}
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;

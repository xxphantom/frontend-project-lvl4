import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import ChannelsList from '../features/channels/ChannelsList.jsx';
import MessagesList from '../features/messages/MessagesList.jsx';
import AddMessageForm from '../features/messages/AddMessageForm.jsx';
import useFetchChatContent from '../hooks/useFetchChatContent.js';
import { selectCurrentMessages } from '../features/messages/messagesSlice.js';
import { selectCurrentChannel } from '../features/channels/channelsSlice';

const ChannelLabel = ({ channelName = '', messagesCount }) => (
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

const ChatBox = ({ currentChannel, messages }) => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <ChannelsList />
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <ChannelLabel
            channelName={currentChannel?.name}
            messagesCount={messages.length}
          />
          <MessagesList messages={messages} />
          <AddMessageForm />
        </div>
      </div>
      <MessagesList />
    </Row>
  </Container>
);

const ChatPage = () => {
  const currentChannel = useSelector(selectCurrentChannel);
  const messages = useSelector(selectCurrentMessages);
  const isInitialDataFetched = useFetchChatContent();
  const chatBox = <ChatBox currentChannel={currentChannel} messages={messages} />;
  const spinnerBox = (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
  return isInitialDataFetched ? chatBox : spinnerBox;
};

export default ChatPage;

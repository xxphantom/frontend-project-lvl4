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
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>Каналы</span>
          <button type="button" onClick={handleModal} className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill px-2">
          <ChannelsList />
        </ul>
      </div>
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

const spinnerBox = (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

const ChatPage = () => {
  const currentChannel = useSelector(selectCurrentChannel);
  const messages = useSelector(selectCurrentMessages);
  const isInitialDataFetched = useFetchChatContent();
  const chatBox = <ChatBox currentChannel={currentChannel} messages={messages} />;
  return isInitialDataFetched ? chatBox : spinnerBox;
};

export default ChatPage;

import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import ChannelsList from '../features/channels/ChannelsList.jsx';
import MessagesList from '../features/messages/MessagesList.jsx';
import useInitChat from '../hooks/useInitChat.js';
import ModalComponent from '../features/modal/ModalComponent.jsx';

const spinnerBox = (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

const Chat = () => {
  const isInitialDataFetched = useInitChat();

  if (!isInitialDataFetched) {
    return spinnerBox;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <ModalComponent />
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsList />
        <MessagesList />
      </Row>
    </Container>
  );
};

export default Chat;

import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import Channels from '../features/channels/Channels.jsx';
import Messages from '../features/messages/Messages.jsx';
import useInitChat from '../hooks/useInitChat.js';
import ModalComponent from '../features/modal/ModalComponent.jsx';

const spinnerBox = (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

const ChatPage = () => {
  const isInitialDataFetched = useInitChat();

  if (!isInitialDataFetched) {
    return spinnerBox;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <ModalComponent />
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default ChatPage;

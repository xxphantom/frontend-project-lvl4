import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectModalInfo } from '../features/modal/modalSlice';
import Channels from '../features/channels/Channels.jsx';
import Messages from '../features/messages/Messages.jsx';
import useInitChat from '../hooks/useInitChat.js';
import getModal from '../features/modal';

const spinnerBox = (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

const renderModal = (modalInfo) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component />;
};

const ChatPage = () => {
  const isInitialDataFetched = useInitChat();
  const modalInfo = useSelector(selectModalInfo);

  if (!isInitialDataFetched) {
    return spinnerBox;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      {renderModal(modalInfo)}
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default ChatPage;

import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ChannelsList from 'pages/Home/components/ChannelsList.jsx';
import MessagesList from 'pages/Home/components/MessagesList.jsx';
import ModalComponent from 'pages/Home/components/modalDialogs';
import useInitChatData from 'pages/Home/hooks/useInitChatData.js';

const spinnerBox = (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

const Home = () => {
  const { t } = useTranslation();
  const isDataFetched = useInitChatData();

  if (!isDataFetched) {
    return spinnerBox;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <ModalComponent t={t} />
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsList t={t} />
        <MessagesList t={t} />
      </Row>
    </Container>
  );
};

export default Home;

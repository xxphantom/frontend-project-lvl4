import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ChannelsList from './ChannelsList.jsx';
import MessagesList from './MessagesList.jsx';
import ModalComponent from '../modal';

import useFetchChatData from '../../hooks/useFetchChatData.js';

const spinnerBox = (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

const Home = () => {
  const { t } = useTranslation();
  const isDataFetched = useFetchChatData();

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

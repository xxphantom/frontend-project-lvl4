import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsList from '../features/channels/ChannelsList.jsx';
import MessagesList from '../features/messages/MessagesList.jsx';
import ModalComponent from '../features/modal/ModalComponent.jsx';
import { channelsActions } from '../features/channels/channelsSlice.js';
import { messagesActions } from '../features/messages/messagesSlice.js';
import routes from '../routes.js';
import { useAuth } from '../hooks';

const spinnerBox = (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

const Chat = () => {
  const { t } = useTranslation();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { token, logOut } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDataFetched) {
      return;
    }
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers });
        const { messages, channels, currentChannelId } = data;
        dispatch(channelsActions.initChannels({ channels, currentChannelId }));
        dispatch(messagesActions.initMessages(messages));
        setIsDataFetched(true);
      } catch (err) {
        if (err.response?.status === 401) {
          logOut();
        }
      }
    };
    fetchContent();
  }, [isDataFetched]);

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

export default Chat;

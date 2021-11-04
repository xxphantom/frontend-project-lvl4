import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import { messagesActions } from '../features/messages/messagesSlice.js';
import { channelsActions } from '../features/channels/channelsSlice.js';
import AuthContext from '../contexts/authContext.js';
import socket from '../api/socket.js';

const mapSocketEventsToActions = {
  removeChannel: channelsActions.channelRemoved,
  renameChannel: channelsActions.channelRenamed,
  newChannel: channelsActions.channelAdded,
  newMessage: messagesActions.messageAdded,
};
const openSocketListeners = (dispatch) => {
  Object.entries(mapSocketEventsToActions).forEach(([socketEvent, action]) => {
    socket.on(socketEvent, (data) => {
      dispatch(action(data));
    });
  });
};

const fetchChatContent = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { token, logOut } = useContext(AuthContext);
  const headers = { Authorization: `Bearer ${token}` };

  const dispatch = useDispatch();

  useEffect(() => {
    openSocketListeners(dispatch);
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers });
        const { messages, channels, currentChannelId } = data;
        dispatch(channelsActions.channelsAdded({ channels, currentChannelId }));
        dispatch(messagesActions.messagesAdded(messages));
        setIsDataFetched(true);
      } catch (err) {
        if (err.response?.status === 401) {
          logOut();
        }
      }
    };
    fetchContent();
  }, []);

  return isDataFetched;
};

export default fetchChatContent;

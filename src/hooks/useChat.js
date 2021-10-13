import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import { channelsAdded } from '../features/channels/channelsSlice.js';
import { messagesAdded } from '../features/messages/messagesSlice.js';
import AuthContext from '../contexts/authContext.js';

const fethInitialContent = () => {
  const { token, logOut } = useContext(AuthContext);
  const headers = { Authorization: `Bearer ${token}` };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers });
        const { messages, channels, currentChannelId } = data;
        dispatch(channelsAdded({ channels, currentChannelId }));
        dispatch(messagesAdded(messages));
      } catch (err) {
        if (err.response?.status === 401) {
          logOut();
        }
      }
    };
    fetchContent();
  }, []);
};

const useChat = () => {
  fethInitialContent();
};

export default useChat;

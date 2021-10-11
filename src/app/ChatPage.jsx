import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../routes.js';
import ChannelsList from '../features/channels/ChannelsList.jsx';
import MessagesList from '../features/messages/MessagesList.jsx';
import { selectChannelById, channelsAdded, selectAllChannels } from '../features/channels/channelsSlice.js';
import { messagesAdded, selectCurrentMessages } from '../features/messages/messagesSlice.js';

const ChatPage = () => {
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);
  const token = user ? user.token : null;
  const headers = { Authorization: `Bearer ${token}` };

  const dispatch = useDispatch();
  const currentChId = useSelector((state) => state.channelsInfo.currentChannelId);
  const currentChannel = useSelector((state) => selectChannelById(state, currentChId));
  const currentMessages = useSelector(selectCurrentMessages);
  const allChannels = useSelector(selectAllChannels);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers });
      const { messages, channels, currentChannelId } = data;
      dispatch(channelsAdded({ channels, currentChannelId }));
      dispatch(messagesAdded(messages));
    };

    try {
      fetchContent();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList currentChannelId={currentChId} channels={allChannels} />
        <MessagesList currentChannel={currentChannel} messages={currentMessages} />
      </div>
    </div>
  );
};

export default ChatPage;

import io from 'socket.io-client';

const socket = io();

export const mapSocketRoutesToActions = {
  removeChannel: 'channels/channelRemoved',
  renameChannel: 'channels/channelRenamed',
  newChannel: 'channels/oneChannelAdded',
  newMessage: 'messages/oneMessageAdded',
};

export default socket;

import {
  sentMessageStatusPending,
  sentMessageStatusSuccess,
  sentMessageStatusFailed,
  messageAdded,

} from '../features/messages/messagesSlice.js';
import {
  channelAdded,
  channelRenamed,
  channelRemoved,
} from '../features/channels/channelsSlice.js';

const mapSocketEventsToActions = {
  removeChannel: channelRemoved,
  renameChannel: channelRenamed,
  newChannel: channelAdded,
  newMessage: messageAdded,
};

const SOCKETIO_MIDDLEWARE = 'SOCKETIO_MIDDLEWARE';

export const socketIOMiddleware = (socket) => (storeApi) => {
  Object.entries(mapSocketEventsToActions).forEach(([socketEvent, action]) => {
    socket.on(socketEvent, (data) => {
      storeApi.dispatch(action(data));
    });
  });
  socket.on('disconnect', (e) => console.error(e, '!!!!!!!!!'));
  socket.on('connect_failed', (e) => console.error(e, 'Failed!'));
  return (next) => (action) => {
    if (action.type !== SOCKETIO_MIDDLEWARE) {
      next(action);
      return;
    }
    const { socketEvent, data } = action.payload;
    storeApi.dispatch(sentMessageStatusPending());
    const withTimeout = () => {
      const timerId = setTimeout(() => {
        storeApi.dispatch(sentMessageStatusFailed());
      }, 2500);
      return (response) => {
        clearTimeout(timerId);
        if (response.status !== 'ok') {
          storeApi.dispatch(sentMessageStatusFailed());
          return;
        }
        storeApi.dispatch(sentMessageStatusSuccess());
      };
    };

    socket.volatile.emit(socketEvent, data, withTimeout());
  };
};

export const emit = (socketEvent, action) => ({
  type: SOCKETIO_MIDDLEWARE,
  payload: { data: action.payload, socketEvent },
});

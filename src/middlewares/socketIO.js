import { sentMessageStatusPending, sentMessageStatusSuccess, sentMessageStatusFailed } from '../features/messages/messagesSlice.js';

const SOCKETIO_MIDDLEWARE = 'SOCKETIO_MIDDLEWARE';

export const socketIOMiddleware = (socket, mapSocketRoutesToActions) => (storeApi) => {
  Object.keys(mapSocketRoutesToActions).forEach((socketEvent) => {
    socket.on(socketEvent, (data) => {
      storeApi.dispatch({
        type: mapSocketRoutesToActions[socketEvent],
        payload: data,
      });
    });
  });
  return (next) => (action) => {
    if (action.type !== SOCKETIO_MIDDLEWARE) {
      next(action);
      return;
    }
    const { socketEvent, data } = action.payload;
    storeApi.dispatch(sentMessageStatusPending());
    setTimeout(() => { // Timeout to explicitly render input blocking (to do delete this)
      socket.emit(socketEvent, data, (response) => {
        if (response.status === 'ok') {
          storeApi.dispatch(sentMessageStatusSuccess());
        } else {
          storeApi.dispatch(sentMessageStatusFailed());
        }
      });
    }, 50);
  };
};

export const emit = (socketEvent, action) => ({
  type: SOCKETIO_MIDDLEWARE,
  payload: { data: action.payload, socketEvent },
});

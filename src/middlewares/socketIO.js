const SOCKETIO_MIDDLEWARE = 'SOCKETIO_MIDDLEWARE';

export const socketIOMiddleware = (socket, mapSocketRoutesToActions) => (storeApi) => {
  Object.keys(mapSocketRoutesToActions).forEach((socketEvent) => {
    console.dir(socketEvent);
    socket.on(socketEvent, (data) => {
      console.dir('Data on socket subscriber:', data);
      storeApi.dispatch({
        type: mapSocketRoutesToActions[socketEvent],
        payload: data,
      });
    });
  });
  return (next) => (action) => {
    if (action.type === SOCKETIO_MIDDLEWARE) {
      const { socketEvent, data } = action.payload;
      socket.emit(socketEvent, data);
      // next(payload);
    }
    next(action);
  };
};

export const emit = (socketEvent, action) => ({
  type: SOCKETIO_MIDDLEWARE,
  payload: { data: action.payload, socketEvent },
});

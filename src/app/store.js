import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../features/messages/messagesSlice.js';
import channelsReducer from '../features/channels/channelsSlice.js';
import socket from '../api/socket.js';
import { socketIOMiddleware } from '../middlewares/socketIO.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(socketIOMiddleware(socket)),
});

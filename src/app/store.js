import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from '../features/channels/channelsSlice.js';
import messagesSlice from '../features/messages/messagesSlice.js';
import modalSlice from '../features/modal/modalSlice.js';
// import socket from '../api/socket.js';
// import { socketIOMiddleware } from '../middlewares/socketIO.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsSlice,
    messagesInfo: messagesSlice,
    modalInfo: modalSlice,
  },
});

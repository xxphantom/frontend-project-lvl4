import { configureStore } from '@reduxjs/toolkit';
import messagesSlice from 'redux/slices/messagesSlice.js';
import channelsSlice from 'redux/slices/channelsSlice.js';
import modalSlice from 'redux/slices/modalSlice.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsSlice,
    messagesInfo: messagesSlice,
    modalInfo: modalSlice,
  },
});

export default store;

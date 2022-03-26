import { configureStore } from '@reduxjs/toolkit';
import messagesSlice from './slices/messagesSlice.js';
import channelsSlice from './slices/channelsSlice.js';
import modalSlice from './slices/modalSlice.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsSlice,
    messagesInfo: messagesSlice,
    modalInfo: modalSlice,
  },
});

export default store;

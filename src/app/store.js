import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../features/messages/messagesSlice.js';
import channelsReducer from '../features/channels/channelsSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
  },
});

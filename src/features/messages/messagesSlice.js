/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter({
  selectId: (post) => post.id,
});

const initialState = messagesAdapter.getInitialState({
  sentMessageStatus: 'idle',
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesAdded(state, action) {
      const messages = action.payload;
      messagesAdapter.upsertMany(state, messages);
    },
    messageAdded: messagesAdapter.addOne,
    sentMessageStatusPending(state) {
      state.sentMessageStatus = 'pending';
    },
    sentMessageStatusSuccess(state) {
      state.sentMessageStatus = 'success';
    },
    sentMessageStatusFailed(state) {
      state.sentMessageStatus = 'failed';
    },
  },
});

export default messagesSlice.reducer;

export const messagesActions = messagesSlice.actions;

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessagesIds,
} = messagesAdapter.getSelectors((state) => state.messagesInfo);

export const selectCurrentMessages = createSelector(
  [selectAllMessages, (state) => state.channelsInfo.currentChannelId],
  (messages, channelId) => messages.filter((message) => message.channelId === channelId),
);

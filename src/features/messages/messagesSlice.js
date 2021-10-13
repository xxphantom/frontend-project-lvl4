/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter({
  selectId: (post) => post.id,
});

const initialState = messagesAdapter.getInitialState();

export const postsSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesAdded(state, action) {
      const messages = action.payload;
      messagesAdapter.upsertMany(state, messages);
    },
    oneMessageAdded: messagesAdapter.addOne,
  },
});

export default postsSlice.reducer;

export const { messagesAdded, oneMessageAdded } = postsSlice.actions;

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessagesIds,
} = messagesAdapter.getSelectors((state) => state.messagesInfo);

export const selectCurrentMessages = createSelector(
  [selectAllMessages, (state) => state.channelsInfo.currentChannelId],
  (messages, channelId) => messages.filter((message) => message.channelId === channelId),
);

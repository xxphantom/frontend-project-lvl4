/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createEntityAdapter,
  original,
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter({
  selectId: (post) => post.id,
});

const initialState = messagesAdapter.getInitialState({
  messages: {},
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    initMessages(state, action) {
      const messages = action.payload;
      messagesAdapter.upsertMany(state, messages);
    },
    messageAdded: messagesAdapter.addOne,
  },
  extraReducers(builder) {
    builder
      .addCase('channels/channelRemoved', (state, action) => {
        const { id } = action.payload;
        const removedMessagesIds = Object
          .values(original(state.entities))
          .filter((entity) => entity.channelId === id)
          .map((entity) => entity.id);
        messagesAdapter.removeMany(state, removedMessagesIds);
      });
  },
});

export default messagesSlice.reducer;

export const messagesActions = messagesSlice.actions;

const {
  selectAll,
  selectById,
  selectIds,
} = messagesAdapter.getSelectors((state) => state.messagesInfo);

const selectCurrentMessages = createSelector(
  [selectAll, (state) => state.channelsInfo.currentChannelId],
  (messages, channelId) => messages.filter((message) => message.channelId === channelId),
);

export const messagesSelectors = {
  all: selectAll,
  byId: selectById,
  ids: selectIds,
  currentMessages: selectCurrentMessages,
};

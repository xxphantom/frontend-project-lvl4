/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter({
});

const initialState = channelsAdapter.getInitialState({
  ids: [],
  entities: {},
  currentChannelId: null,
});

const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannels(state, action) {
      const { channels, currentChannelId } = action.payload;
      state.currentChannelId = currentChannelId;
      channelsAdapter.upsertMany(state, channels);
    },
    currentChannelChanged(state, action) {
      state.currentChannelId = action.payload;
    },
    channelAdded(state, action) {
      const channel = action.payload;
      const { id } = channel;
      channelsAdapter.addOne(state, channel);
      state.currentChannelId = id;
    },
    channelRenamed: channelsAdapter.upsertOne,
    channelRemoved(state, action) {
      const channelId = action.payload.id;
      if (state.currentChannelId === channelId) {
        state.currentChannelId = defaultChannelId;
      }
      channelsAdapter.removeOne(state, channelId);
    },
  },
});

export default channelsSlice.reducer;

export const channelsActions = channelsSlice.actions;

const {
  selectAll,
  selectById,
  selectIds,
} = channelsAdapter.getSelectors((state) => state.channelsInfo);

const selectCurrentChannelId = (state) => state.channelsInfo.currentChannelId;
const selectCurrentChannel = (state) => (
  selectById(state, selectCurrentChannelId(state)));
const selectChannelNames = createSelector(selectAll, (channels) => channels
  .map((channel) => channel.name));

export const channelsSelectors = {
  all: selectAll,
  byId: selectById,
  ids: selectIds,
  currentId: selectCurrentChannelId,
  currentChannel: selectCurrentChannel,
  names: selectChannelNames,
};

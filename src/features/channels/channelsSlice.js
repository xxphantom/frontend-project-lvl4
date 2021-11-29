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
    channelsAdded(state, action) {
      const { channels, currentChannelId } = action.payload;
      state.currentChannelId = currentChannelId;
      channelsAdapter.upsertMany(state, channels);
    },
    currentChannelChanged(state, action) {
      state.currentChannelId = action.payload;
    },
    channelAdded: channelsAdapter.addOne,
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

export const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
  selectIds: selectChannelsIds,
} = channelsAdapter.getSelectors((state) => state.channelsInfo);

export const selectCurrentChannelId = (state) => state.channelsInfo.currentChannelId;
export const selectCurrentChannel = (state) => (
  selectChannelById(state, selectCurrentChannelId(state)));
export const selectChannelNames = createSelector(selectAllChannels, (channels) => channels
  .map((channel) => channel.name));

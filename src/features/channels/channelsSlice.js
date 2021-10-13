/* eslint-disable no-param-reassign */
import {
  createSlice,
  // createAsyncThunk,
  // createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter({
});

const initialState = channelsAdapter.getInitialState({
  ids: [],
  entities: {},
  currentChannelId: null,
});

export const channelsSlice = createSlice({
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
    oneChannelAdded: channelsAdapter.addOne,
    channelRenamed: channelsAdapter.updateOne,
    channelRemoved: channelsAdapter.removeOne,
  },
});

export default channelsSlice.reducer;

export const { channelsAdded, currentChannelChanged } = channelsSlice.actions;

export const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
  selectIds: selectChannelsIds,
} = channelsAdapter.getSelectors((state) => state.channelsInfo);

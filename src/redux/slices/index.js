import channelsSlice, { channelsActions, channelsSelectors } from './channelsSlice.js';
import modalSlice, { modalActions, selectModalInfo } from './modalSlice.js';
import messagesSlice, { messagesActions, messagesSelectors } from './messagesSlice.js';

export const slices = {
  channels: channelsSlice,
  modal: modalSlice,
  messages: messagesSlice,
};

export const actions = {
  ...channelsActions,
  ...modalActions,
  ...messagesActions,
};

export const selectors = {
  channels: channelsSelectors,
  modal: selectModalInfo,
  messages: messagesSelectors,
};

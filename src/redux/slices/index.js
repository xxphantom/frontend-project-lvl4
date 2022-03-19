import channelsSlice, { channelsActions, channelsSelectors } from './channelsSlice.js';
import modalSlice, { modalActions, selectModalInfo } from './modalSlice.js';
import messagesSlice, { messagesActions, messagesSelectors } from './messagesSlice.js';

export const slices = {
  channels: channelsSlice,
  modals: modalSlice,
  messages: messagesSlice,
};

export const actions = {
  channels: channelsActions,
  modal: modalActions,
  messages: messagesActions,
};

export const selectors = {
  channels: channelsSelectors,
  messages: messagesSelectors,
  modalInfo: selectModalInfo,
};

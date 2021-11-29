/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
  extra: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      const { payload } = action;
      state.isOpen = true;
      state.type = payload.modalType;

      if (payload.extra) {
        state.extra = payload.extra;
      }
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const modalActions = modalSlice.actions;

export const selectModalInfo = (state) => state.modalInfo;

export default modalSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      const { payload } = action;
      state.isOpen = true;
      state.type = payload.modalType;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export const selectModalInfo = (state) => state.modalInfo;

export default modalSlice.reducer;

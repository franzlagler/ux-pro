import { createSlice } from '@reduxjs/toolkit';

export const answerBackgroundSlice = createSlice({
  name: 'answerBackground',
  initialState: {
    value: ['#fff', '#fff', '#fff', '#fff'],
  },
  reducers: {
    changeToPurple: (state, action) => {
      state.value[action.payload] = '#ada7ff';
    },
    changeToWhite: (state, action) => {
      state.value[action.payload] = '#fff';
    },
  },
});

export const { changeToPurple, changeToWhite } = answerBackgroundSlice.actions;

export default answerBackgroundSlice.reducer;

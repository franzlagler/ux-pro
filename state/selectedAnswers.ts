import { createSlice } from '@reduxjs/toolkit';

export const selectedAnswersSlicer = createSlice({
  name: 'selectedAnswers',
  initialState: {
    value: [false, false, false, false],
  },
  reducers: {
    select: (state, action) => {
      state.value[action.payload] = true;
    },
    deselect: (state, action) => {
      state.value[action.payload] = false;
    },
  },
});

export const { deselect, select } = selectedAnswersSlicer.actions;
export default selectedAnswersSlicer.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const answeredQuestionsSlicer = createSlice({
  name: 'currentTopic',
  initialState: {
    value: null,
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update } = answeredQuestionsSlicer.actions;
export default answeredQuestionsSlicer.reducer;

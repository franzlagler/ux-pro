import { configureStore } from '@reduxjs/toolkit';
import answerBackgroundReducer from './answerBackground';
import selectedAnswersReducer from './selectedAnswers';

export const store = configureStore({
  reducer: {
    answerBackground: answerBackgroundReducer,
    selectedAnswers: selectedAnswersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

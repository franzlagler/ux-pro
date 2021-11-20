import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import currentTopicReducer from './selectedAnswers';

export const store = configureStore({
  reducer: {
    currentTopic: currentTopicReducer,
  },
});

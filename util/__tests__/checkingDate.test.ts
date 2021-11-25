import { expect } from '@jest/globals';
import { checkDateOfQuiz } from '../quiz';

const today = new Date();
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 4));

test('check when quiz was done today', () => {
  expect(checkDateOfQuiz(today)).toEqual('Today.');
});

test('check when quiz was done yesterday', () => {
  expect(checkDateOfQuiz(yesterday)).toEqual('Yesterday.');
});

test('check when quiz was done yesterday', () => {
  expect(checkDateOfQuiz(twoDaysAgo)).toEqual('More than two days ago.');
});

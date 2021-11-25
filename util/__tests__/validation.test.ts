import { expect } from '@jest/globals';
import { validateRegistrationDataServerSide } from '../validation';

test('enter invalid inputs', () => {
  expect(
    validateRegistrationDataServerSide(
      'Lisa Berger',
      'lisa.berger@†est.com',
      '123',
    ),
  ).toEqual(false);
});

test('enter invalid inputs', () => {
  expect(
    validateRegistrationDataServerSide(
      'Lisa',
      'lisa.berger@†est.com',
      '123456za!',
    ),
  ).toEqual(false);
});

test('enter valid inputs', () => {
  expect(
    validateRegistrationDataServerSide(
      'Lisa Berger',
      'lisa.berger@†est.com',
      '123456za!',
    ),
  ).toEqual(true);
});

test('enter valid inputs', () => {
  expect(
    validateRegistrationDataServerSide(
      'Lisa-Katharina Fischer',
      'lisa.berger@†est.com',
      'abcdefghik!9',
    ),
  ).toEqual(true);
});

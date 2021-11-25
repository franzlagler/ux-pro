import { expect } from '@jest/globals';
import { fetchTopicData } from '../topics';

test('Enter existing topic number', () => {
  expect(fetchTopicData('accessible-buttons')).not.toBeNull();
});

test('Enter existing topic number', () => {
  expect(fetchTopicData('accessible-button')).toBeNull();
});

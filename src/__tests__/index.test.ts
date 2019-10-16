import { createStandardAction } from '../index';

test('createStandardAction should create action creator that creates... an action xD', () => {
  const ac = createStandardAction('START')<string>();
  expect(ac.getType()).toBe('START');
  expect(ac.toString()).toBe('START');
  expect(ac('Hello')).toEqual({ type: 'START', payload: 'Hello', meta: undefined });
});

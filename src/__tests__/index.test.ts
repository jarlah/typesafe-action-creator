import {createAsyncAction, createStandardAction} from '../index';

test('createStandardAction should create action creator that creates... an action xD', () => {
  const ac = createStandardAction('START')<string>();
  expect(ac.getType()).toBe('START');
  expect(ac.toString()).toBe('START');
  expect(ac('Hello')).toEqual({ type: 'START', payload: 'Hello', meta: undefined });
});

test('createAsyncAction should create action creators that creates actions', () => {
  const ac = createAsyncAction('START', 'SUCCESS', 'FAIL')<string, number, Error>();
  expect(ac.request.getType()).toBe('START');
  expect(ac.request.toString()).toBe('START');
  expect(ac.request("hello")).toEqual({ type: 'START', payload: 'hello', meta: undefined });
  expect(ac.success.getType()).toBe('SUCCESS');
  expect(ac.success.toString()).toBe('SUCCESS');
  expect(ac.success(1)).toEqual({ type: 'SUCCESS', payload: 1, meta: undefined });
  expect(ac.failure.getType()).toBe('FAIL');
  expect(ac.failure.toString()).toBe('FAIL');
  const error = new Error("Hello");
  expect(ac.failure(error)).toEqual({ type: 'FAIL', payload: error, meta: undefined });
});

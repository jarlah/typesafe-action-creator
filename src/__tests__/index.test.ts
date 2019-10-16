import { createStandardAction } from '../index';

test('My Greeter', () => {
    const ac = createStandardAction('START')<string>();
    expect(ac.getType()).toBe('START');
    expect(ac.toString()).toBe('START');
});

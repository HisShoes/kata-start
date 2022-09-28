import { fizzbuzz } from '../index';

// Goal:
//  we want a function that returns the "fizzbuzz" answer for a number
//  input: 1,2,3,4,5,6,7,8,9
//  output: 1,2,fizz,4,buzz....

describe('fizzbuzz', () => {

  it.each([{ input: 1 }, { input: 2 }, { input: 4 }])('returns the string of $input', ({ input }) => {
    expect(fizzbuzz(input)).toBe(`${input}`);
  });

  it.each([{ input: 3 }, { input: 6 }, { input: 9 }, { input: 12 }])(
    'for $input returns "fizz" since its divisible by 3',
    ({ input }) => {
      expect(fizzbuzz(input)).toBe('fizz');
    },
  );

  it.each([{ input: 5 }, { input: 10 }, { input: 20 }, { input: 25 }])(
    'for $input returns "buzz" since its divisible by 5',
    ({ input }) => {
      expect(fizzbuzz(input)).toBe('buzz');
    },
  );

  it.each([{ input: 15 }, { input: 30 }, { input: 45 }])(
    'for $input returns "fizz buzz" since its divisible by both 3 and 5',
    ({ input }) => {
      expect(fizzbuzz(input)).toBe('fizz buzz');
    },
  );
});

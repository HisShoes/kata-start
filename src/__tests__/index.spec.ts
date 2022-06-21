import { parseNumber } from '..';

// expect(parseNumber(1, 1)).toBe(2);

describe('parseNumber', () => {
  it('parses the number 1', () => {
   expect (parseNumber(`   
  |
  |`
    )).toBe(1);
  });
});

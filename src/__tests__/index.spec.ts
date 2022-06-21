import { getLeaves, parseNumber,  splitStringToThrees } from '..';

// expect(parseNumber(1, 1)).toBe(2);

describe('splitStringToThrees', () => {
  it('splits the string into threes', () => {
    expect(splitStringToThrees(`    _ `)).toEqual(['   ', ' _ '])
  })
})

describe('tree tests', ()=>{
  it('should return leaves', () => {
    expect(getLeaves('   ')).toEqual(['  |'])
  })
})

describe('parseNumber', () => {
  it('parses the number 1', () => {
   expect (parseNumber(`   
  |
  |`
    )).toBe(1);
  });
  it('parses the number 12', () => {
    expect (parseNumber(
`    _ 
  | _|
  ||_ `
     )).toBe(12);
   });
});

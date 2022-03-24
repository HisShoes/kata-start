import { chop } from '..';
import { testData } from '../../binary-search-test-data';

describe('chop', () => {
  it.each`
    target | array  | result
    ${1}   | ${[1]} | ${0}
    ${1}   | ${[1, 2, 3, 4, 5]} | ${0}
    ${2}   | ${[1, 2, 3, 4, 5]} | ${1}
    ${3}   | ${[1, 2, 3, 4, 5]} | ${2}
    ${4}   | ${[1, 2, 3, 4, 5]} | ${3}
    ${5}   | ${[1, 2, 3, 4, 5]} | ${4}
    ${170}   | ${[10, 20, 80, 30, 60, 50, 110, 100, 130]} | ${-1}
  `('finds $target in $array at index $result', ({ target, array, result }) => {
    expect(chop(target, array)).toBe(result);
  });
});
describe.only('chop', () => {
  it.each(testData)('finds $target in $array at index $result', ({ target, array, index }) => {
    expect(chop(target, array)).toBe(index);
  });
});
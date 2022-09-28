export function fizzbuzz(i: number): string {
  if (i % 15 === 0) {
    return 'fizz buzz';
  }

  if (i % 3 === 0) {
    return 'fizz';
  }

  if (i % 5 === 0) {
    return 'buzz';
  }

  return `${i}`;
}

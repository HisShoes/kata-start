export const chop = (target: number, array: number[], start = 0, end = array.length): number => {
  const currentArray = array.slice(start, end);
  const halfWayIndex = Math.floor(currentArray.length / 2);

  if (array[halfWayIndex] === target) {
    return halfWayIndex;
  } else if (array[halfWayIndex] < target) {
    return chop(target, array.slice(halfWayIndex)) + halfWayIndex;
  } else {
    return chop(target, array.slice(0, halfWayIndex));
  }
};

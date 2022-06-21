const maps = {
    [`   
  |
  |`]: 1,
  [` _ 
 _|
|_ `]: 2
};

export const splitStringToThrees = (str: string) => {
  const x: string[] = [];

  for(let i = 0; i < str.length; i+=3) {
    x.push(str.slice(i,i+3));
  }
  return x;
}

export const parseNumber = (file: string) => {
  //[
  //"    _ "
  //"  | _|"
  //"  ||_ "
  //]

  //[
  //["   ", " _ "]
  //["  |", " _|"]
  //["  |", "|_ "]
  //]
  
  //one = ["   ", "  |", "  |"]
  //two - [" _ ", " _|", "|_ "]

  //  [  _ 
  //  | _|
  //  ||_ ]

    const lines: string[][] = file.split('\n').map(splitStringToThrees);

    const one = [lines[0][0], lines[1][0], lines[2][0]].join('\n');
    const two = [lines[0][1], lines[1][1], lines[2][1]].join('\n');

    return parseInt(`${maps[one]}${maps[two]}`)
}

// export const parseLine = (file: string) => {}


// const fileContents = 
//  `  _  _     _  _  _  _  _ 
//   | _| _||_||_ |_   ||_||_|
//   ||_  _|  | _||_|  ||_| _|

//     _  _     _  _  _  _  _ 
//   | _| _||_||_ |_   ||_||_|
//   ||_  _|  | _||_|  ||_| _|
// `;

// 1 = [
//   ['  ']
//   [' |']
//   [' |']
// ]
// .join('\n')

// const map = {
//   '   ': {
//     '  |': {
//       '  |': 1
//     },
//     '|_|': 4, 
//   },
//   ' _ ': {

//   }
// }
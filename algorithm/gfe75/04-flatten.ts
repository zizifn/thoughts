type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
  const result: any[] = [];

  function walk(value: Array<ArrayValue>, result: any[]) {
    for (const item of value) {
      // if(!item){

      // }

      if (!Array.isArray(item)) {
        result.push(item);
        continue;
      }

      if (Array.isArray(item)) {
        walk(item, result);
      }
    }
  }

  walk(value, result);

  return result;
}

// export default function flatten(value: Array<ArrayValue>): Array<any> {
//   while (value.some(Array.isArray)) {
//     value = [].concat(...value);
//   }

//   return value;
// }

// console.log([...[1, [2, 3]]])
console.log([].concat(...[1, [2, 3]]));

// Single-level arrays are unaffected.
console.log(flatten([1, 2, 3])); // [1, 2, 3]

// Inner arrays are flattened into a single level.
console.log(flatten([1, [2, 3]])); // [1, 2, 3]
console.log(
  flatten([
    [1, 2],
    [3, 4],
  ])
); // [1, 2, 3, 4]

// Flattens recursively.
console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]

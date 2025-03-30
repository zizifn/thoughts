export default function listFormat(
  items: Array<string>,
  options?: { sorted?: boolean; length?: number; unique?: boolean }
): string {
  let temp = items.filter(Boolean);
  let length = temp.length;
  if (length == 0 || length == 1) {
    return temp.join("");
  }
  if (!options) {
    return `${temp.slice(0, length - 1).join(", ")} and ${temp[length - 1]}`;
  }

  // have options
  if (options.length < 0 || options.length > length || options.length === 0) {
    options.length = undefined;
  }

  if (options.unique) {
    temp = Array.from(new Set(temp));
    length = temp.length;
  }

  if (options.sorted) {
    temp = temp.sort();
  }
  let firParts = temp.slice(0, options.length);
  if (!options.length) {
    return `${firParts.slice(0, length - 1).join(", ")} and ${
      firParts[length - 1]
    }`;
  } else {
    return `${firParts.join(", ")} and ${length - options.length} other${
      length - options.length > 1 ? "s" : ""
    }`;
  }
}

console.log(
  listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
    length: 3,
    sorted: true,
  })
);
// console.log(listFormat(["Bob", "Ben", "Tim", "Jane", "John"], { length: 4 }));
// console.log(listFormat(["Bob", "Ben", "Tim", "Jane", "John"], { length: 3 }));

// console.log(listFormat(["Bob", "Ben", "Bob", "Ben", "John"], { sorted: true }));
// console.log(listFormat([])); // ''

// console.log(listFormat(["Bob"])); // 'Bob'
// console.log(listFormat(["Bob", "Alice"])); // 'Bob and Alice'

// console.log(listFormat(["Bob", "Ben", "Tim", "Jane", "John"]));
// // 'Bob, Ben, Tim, Jane and John'

// console.log(
//   listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
//     length: 3,
//   })
// ); // 'Bob, Ben, Tim and 2 others'

// console.log(
//   listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
//     length: 4,
//   })
// ); // 'Bob, Ben, Tim, Jane and 1 other'

// console.log(
//   listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
//     length: 3,
//     sorted: true,
//   })
// ); // 'Ben, Bob, Jane and 2 others'

// listFormat(["Bob", "Ben", "Tim", "Jane", "John", "Bob"], {
//   length: 3,
//   unique: true,
// }); // 'Bob, Ben, Tim and 2 others'

// console.log(
//   listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
//     length: 3,
//     unique: true,
//   })
// ); // 'Bob, Ben, Tim and 2 others'

// console.log(listFormat(["Bob", "Ben", "", "", "John"])); // 'Bob, Ben and John'

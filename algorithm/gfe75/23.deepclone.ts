function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default function deepEqual(valueA: unknown, valueB: unknown): boolean {
  // throw "Not implemented!";
  const type = typeof valueA;
  if (type !== "object") {
    return valueA === valueB;
  }
  // if object compare reference
  if (valueA === valueB) {
    return true;
  }

  // if array
  if (Array.isArray(valueA)) {
    if (!Array.isArray(valueB)) {
      return false;
    }
    for (let index = 0; index < valueA.length; index++) {
      const element = valueA[index];
      const result = deepEqual(element, valueB[index]);
      if (result === false) {
        return false;
      }
    }
    return true;
  }
  // object

  if (!isObject(valueB)) {
    return false;
  }
  const entries = Object.entries(valueA);
  const entriesB = Object.entries(valueB);
  console.log(entries.length, entriesB.length);

  if (entries.length !== entriesB.length) {
    return false;
  }

  for (const [key, value] of entries) {
    // console.log(key, value);
    const result = deepEqual(value, valueB[key]);
    if (result === false) {
      return false;
    }
  }
  return true;
}

console.log(
  deepEqual(
    { foo: "bar", item: [1, 2, { baz: "baz" }] },
    { foo: "bar", item: [1, 2, { baz: "baz" }], id: 1 }
  )
);

// console.log(deepEqual("foo", "foo")); // true
// console.log(deepEqual({ id: 1 }, { id: 1 })); // true
// console.log(deepEqual([1, 2, 3], [1, 2, 3])); // true
// console.log(deepEqual([{ id: "1" }], [{ id: "2" }])); // false

export default function squashObject(obj: Object): Object {
  if (!obj) {
    return obj;
  }
  const result: Record<string, Object> = {};

  for (const [key, value] of Object.entries(obj)) {
    const typeValue = typeof value;
    if (!value || typeValue !== "object") {
      result[key] = value;
      continue;
    }

    const objValue: Record<string, any> = squashObject(value);
    console.log(objValue);
    for (const nestKey in objValue) {
      const keys = [key, nestKey].filter(Boolean).join(".");
      result[keys] = objValue[nestKey];
      console.log(result);
    }
  }
  return result;
}

console.log(
  squashObject({
    foo: {
      "": {
        "": 1,
        bar: 2,
      },
    },
  })
);
// let object = {
//   a: { b: null, c: undefined },
// };

// let object = { b: null, c: undefined };
console.log(squashObject(object)); // { 'a.b': null, 'a.c': undefined }

// console.log(squashObject({ a: "1", b: "b" }));

// let object = {
//   a: 5,
//   b: 6,
//   g: [0, 1, 2, 3],
//   c: {
//     f: 9,
//     g: {
//       m: 17,
//       n: 3,
//     },
//   },
// };

// console.log(squashObject(object)); // { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }

// object = { a: { b: [1, 2, 3], c: ["foo"] } };
// squashObject(object); // { 'a.b.0': 1, 'a.b.1': 2, 'a.b.2': 3, 'a.c.0': 'foo' }

// object = {
//   foo: {
//     "": { "": 1, bar: 2 },
//   },
// };
// squashObject(object); // { foo: 1, 'foo.bar': 2 }

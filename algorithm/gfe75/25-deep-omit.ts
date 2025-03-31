export default function deepOmit(val: unknown, keys: Array<string>): unknown {
  // throw "Not implemented";
  const type = typeof val;

  if (type !== "object") {
    return val;
  }

  if (Array.isArray(val)) {
    const temp = [];
    for (const element of val) {
      temp.push(deepOmit(element, keys));
    }
    return temp;
  }

  if (typeof val === "object") {
    const temp: Record<string, any> = {};
    for (const key in val) {
      if (!keys.includes(key)) {
        temp[key] = deepOmit(val[key], keys);
      }
    }
    return temp;
  }
  return {};
}

console.log(deepOmit({ a: 1, b: 2, c: 3 }, ["b"])); // { a: 1, c: 3 }

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};
console.log(deepOmit(obj, ["b", "c", "e"])); // { a: 1, f: [5, 6] }

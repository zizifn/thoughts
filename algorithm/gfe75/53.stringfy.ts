export default function jsonStringify(value: unknown): string {
  function walk(element: unknown): string {
    if (typeof element === "string") {
      return `"${element}"`;
    }
    if (typeof element !== "object" || element === null) {
      return String(element);
    }

    if (Array.isArray(value)) {
      const results = [];
      for (const item of value) {
        results.push(jsonStringify(item));
      }
      return `[${results.join(",")}]`;
    }

    const obj: string[] = [];
    for (const [key, itemValue] of Object.entries(value)) {
      const itemValueStr = jsonStringify(itemValue);
      obj.push(`"${key}":${itemValueStr}`);
    }

    return `{${obj.join(",")}}`;
  }

  return walk(value);
}

console.log(jsonStringify(null)); // 'null'
// jsonStringify(true); // 'true'
// jsonStringify(false); // 'false'

// console.log(jsonStringify({ foo: undefined })); // '{"foo":"bar"}'
// console.log(jsonStringify({ foo: "bar", bar: [1, 2, 3] })); // '{"foo":"bar","bar":[1,2,3]}'
// // jsonStringify({ foo: true, bar: false }); // '{"foo":true,"bar":false}'

// jsonStringify(1); // '1'
// console.log(jsonStringify("foo")); // '"foo"'

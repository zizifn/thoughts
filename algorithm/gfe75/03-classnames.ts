export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export default function classNames(...args: Array<ClassValue>): string {
  const result = [];
  for (const item of args) {
    if (!item) {
      continue;
    }
    if (typeof item === "string" || typeof item === "number") {
      result.push(item);
    }

    if (Array.isArray(item)) {
      for (const element of item) {
        result.push(classNames(element));
      }
    } else if (typeof item === "object") {
      for (const [key, value] of Object.entries(item)) {
        if (value) {
          result.push(classNames(key));
        }
      }
    }
  }

  return result.join(" ");
}

console.log(classNames(null, false, "bar", undefined, 0, 1, { baz: null }, ""));
console.log(classNames(["foo", "bar", "baz"]));
// console.log(
//   classNames("boo", true && "loo", false && "booz", {
//     foo: true,
//     bar: false,
//     baz: 1,
//   })
// );
// console.log(classNames("a", ["b", { c: true, d: false }])); // 'a b c')
// console.log(classNames("foo", "bar")); // 'foo bar'
// console.log(classNames("foo", { bar: true })); // 'foo bar'
// console.log(classNames({ "foo-bar": true })); // 'foo-bar'
// console.log(classNames({ "foo-bar": false })); // ''
// console.log(classNames({ foo: true }, { bar: true })); // 'foo bar'
// console.log(classNames({ foo: true, bar: true })); // 'foo bar'
// console.log(classNames({ foo: true, bar: false, qux: true })); // 'foo qux'

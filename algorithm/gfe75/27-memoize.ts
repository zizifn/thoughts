type Fn = (this: any, arg: string | number) => unknown;

export default function memoize(func: Fn): Fn {
  const lastResult = new Map();
  return function (...args) {
    const str = JSON.stringify(args);
    console.log(str);
    if (lastResult.has(str)) {
      return lastResult.get(str);
    } else {
      const result = func.bind(this)(...args);
      lastResult.set(str, result);
      return result;
    }
  };
}

let count = 0;
function repeat(x: string) {
  count++;
  return x + x;
}
const memoizedFn = memoize(repeat);

console.log(memoizedFn("foo"));
console.log(count);

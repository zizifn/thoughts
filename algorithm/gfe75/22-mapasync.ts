export default function mapAsyncLimit<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size?: number
): Promise<Array<U>> {
  // throw "Not implemented";

  const stack = [];

  function walk() {
    if (stack.length < 2) {
    }
  }
}

async function fetchUpperCase(q: string) {
  // Fake API service that converts a string to uppercase.
  const res = await fetch("https://uppercase.com?q=" + q);
  return await res.text();
}

// Only a maximum of 2 pending requests at any one time.
const results = await mapAsyncLimit(
  ["foo", "bar", "qux", "quz"],
  fetchUpperCase,
  2
);
console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];

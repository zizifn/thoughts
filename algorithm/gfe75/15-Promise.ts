export default function promiseAll<T extends readonly unknown[] | []>(
  iterable: T
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
  let count = iterable.length;
  const results = new Array(count);
  if (!count) {
    return Promise.resolve([]) as any;
  }
  return new Promise((resolve, rej) => {
    iterable.forEach(async (item, index) => {
      try {
        const result = await item;
        results[index] = result;
        count--;
        if (count === 0) {
          resolve(results);
        }
      } catch (error) {
        rej(error);
      }
    });
  });
}

// Resolved example.
// const p0 = Promise.resolve(3);
// const p1 = 42;
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("foo");
//   }, 100);
// });

// const result = await promiseAll([p0, p1, p2]); // [3, 42, 'foo']

// console.log(result);

// console.log(await promiseAll([]));
// console.log(await promiseAll([p1]));

// const p0 = Promise.reject(2);
// const p1 = Promise.reject(3);

// console.log(promiseAll([p0, p1]));

const p = new Promise((res) => {
  setTimeout(() => {
    res("first");
  }, 100);
  setTimeout(() => {
    res("second");
  }, 200);
});

p.then(console.log);

// function test(a, b) {
//   return a + b;
// }

// console.log(test(1, 2));
// function test(a, b, c) {
//   return a + b + c;
// }
// console.log(test(1, 2, 3));

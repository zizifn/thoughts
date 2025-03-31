export default function promiseAny<T>(iterable: Array<T>): Promise<T> {
  // throw "Not implemented!";
  let length = iterable.length;
  return new Promise((res, rej) => {
    if (length === 0) {
      rej(new AggregateError([]));
      return;
    }

    const results = [];
    iterable.forEach(async (itemP, index) => {
      try {
        console.log(itemP);
        const result = await itemP;
        res(result);
      } catch (error) {
        console.log(error);
        length = length - 1;
        results[index] = error;
        console.log(length);
        if (length === 0) {
          rej(new AggregateError(results));
        }
      }
    });
  });
}

const p0 = Promise.reject(42);
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(21);
//   }, 100);
// });

console.log(await promiseAny([p0])); // 42

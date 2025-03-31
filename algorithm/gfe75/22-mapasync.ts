export default function mapAsyncLimit<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size?: number
): Promise<Array<U>> {
  if (!size) {
    size = 1;
  }
  const length = iterable.length;
  let pendings = iterable.splice(0, size).map(callbackFn);
  console.log(pendings.length);
  return new Promise((resolve, rej) => {
    async function p() {
      const results = [];
      for (; results.length < length; ) {
        try {
          console.log(pendings.length);
          const { origin, value } = await Promise.race(
            pendings.map((item) => {
              return item.then((value) => ({
                origin: item,
                value,
              }));
            })
          );
          // console.log(origin, value);
          results.push(value);
          const index = pendings.findIndex((p) => p === origin);
          // console.log(index);
          pendings.splice(index, 1);

          if (iterable.length) {
            const q = iterable.shift();
            console.log(q);
            // const p = ;
            pendings.push(callbackFn(q));
          }
        } catch (error) {
          console.log(error);
          rej(error);
          return;
        }
      }

      resolve(results);
    }

    try {
      p();
    } catch (error) {
      rej(error);
    }
  });
}

let ongoing = 0;
const limit = 2;

const res = await mapAsyncLimit(
  [1, 2, 3, 4, 5],
  (x: number) => {
    ongoing++;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (ongoing > limit) {
          reject("Concurrency limit exceeded");
        }

        resolve(x * 2);
        ongoing--;
      }, 10);
    });
  },
  limit
);
console.log(res);

async function fetchUpperCase(q: string) {
  // Fake API service that converts a string to uppercase.
  const res = await fetch("https://uppercase.com?q=" + q);
  return await res.text();
}

function createTask(num, ms = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`promise ${num}`, Date.now());
      resolve(num);
    }, ms);
  });
}

// Only a maximum of 2 pending requests at any one time.
// const results = await mapAsyncLimit(["foo", "bar"], createTask);
// console.log("end-------------", results); // ['FOO', 'BAR', 'QUX', 'QUZ'];

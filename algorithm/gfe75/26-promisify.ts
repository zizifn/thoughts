export default function promisify<T>(
  func: (...args: any[]) => void
): (this: any, ...args: any[]) => Promise<T> {
  // throw "Not implemented";

  return function (...args: any[]): Promise<T> {
    console.log(this);
    return new Promise((res, rej) => {
      try {
        func.bind(this)(...args, (error, value) => {
          console.log(this);
          if (error) {
            rej(error);
          } else {
            res(value);
          }
        });
      } catch (error) {
        rej(error);
      }
    });
  };
}

function asyncAdd(this: any, a: number, b: number, cb: Function) {
  console.log(this);
  setTimeout(() => {
    cb(null, a + b + this.base);
  }, 10);
}

const promisifiedAdd = promisify(asyncAdd);
const obj = { base: 5, add: promisifiedAdd };
const res = await obj.add(17, 19);
console.log(res);

type ThrottleFunction<T extends any[]> = (...args: T) => any;

export default function throttle<T extends any[]>(
  func: ThrottleFunction<T>,
  wait: number
): ThrottleFunction<T> {
  let timerID = null;
  let isFirst = true;
  return function (...args) {
    if (timerID) {
      return;
    }
    func.apply(this, args);
    timerID = setTimeout(() => {
      timerID = null;
    }, wait);
  };
}

let i = 0;
const increment = throttle(() => {
  i++;
  console.log(i);
}, 100);

console.log(i);
// expect(i).toBe(0);
increment();
console.log(i);
// expect(i).toBe(1);

// Should not fire yet.
setTimeout(() => {
  // expect(i).toBe(1);
  increment();
  console.log(i);
  // expect(i).toBe(1);
}, 50);

setTimeout(() => {
  // expect(i).toBe(1);
  console.log(i);
  increment();
  console.log(i);
  // expect(i).toBe(2);
}, 150);

setTimeout(() => {
  console.log(i);
  // expect(i).toBe(2);
  increment();
  console.log(i);
  // expect(i).toBe(2);
  // done();
}, 200);

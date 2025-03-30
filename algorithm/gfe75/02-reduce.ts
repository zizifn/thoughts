interface Array<T> {
  myReduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue?: U
  ): U;
}

Array.prototype.myReduce = function (callbackFn, initialValue) {
  if (initialValue !== undefined) {
    let prev = initialValue;
    for (let i = 0; i < this.length; i++) {
      if (this[i] !== undefined) {
        prev = callbackFn(prev, this[i], i, this);
      }
    }
    return prev;
  } else {
    if (this.length === 0) {
      throw "empty array can't with init value";
    }
    let prev = this[0];
    for (let i = 1; i < this.length; i++) {
      if (this[i] !== undefined) {
        prev = callbackFn(prev, this[i], i, this);
      }
    }
    return prev;
  }
};

let result = [1, 2, , 3].myReduce((prev, curr) => prev + curr, 0); // 6
console.log(result);

result = [].reduce((prev, curr) => {
  console.log(prev, curr);
  return prev + curr;
}); // 6
console.log(result);

console.log();

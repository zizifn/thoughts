interface Function {
  myCall(this: Function, thisArg: any, ...argArray: any[]): any;
}

Function.prototype.myCall = function (thisArg, ...argArray) {
  const sym = Symbol();
  const temp = {
    ...thisArg,
  };
  const temp2 = Object(thisArg);
  temp2[sym] = this;

  const wrapperObj = Object(thisArg);
  // console.log(temp.);
  console.log(temp[sym]);

  return temp[sym](...argArray);
};

function multiplyAge(multiplier = 1) {
  return this.age * multiplier;
}

const mary = {
  age: 21,
};

const john = {
  age: 42,
};

console.log(multiplyAge.myCall(mary)); // 21
console.log(multiplyAge.myCall(john, 2)); // 84

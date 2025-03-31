// export default function curry(func: Function): Function {
//   return function temp(arg) {
//     let argsLength = func.length;
//     let args = [];

//     function walk(arg) {
//       if (arg) {
//         args.push(arg);
//         argsLength = argsLength - 1;
//       }
//       if (argsLength <= 0) {
//         return func.bind(this)(...args);
//       } else {
//         return walk.bind(this);
//       }
//     }
//     return walk.bind(this)(arg);
//   };
// }

export default function curry(func) {
  return function curried(...args) {
    console.log(args);
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return (arg) =>
      arg === undefined
        ? curried.apply(this, args)
        : curried.apply(this, [...args, arg]);
  };
}

const square = (a: number) => a * a;
const curried = curry(square);
console.log(curried());
// console.log(curried(2));

// function add(a, b) {
//   console.log(this);
//   return a + b;
// }

// const empty = () => 0;
// const curried = curry(empty);
// console.log(curried());

// const curriedAdd = curry(add);
// const testthis = {
//   a: 1,
//   curriedAdd: curry(add),
// };
// console.log(testthis.curriedAdd(3)(4)); // 7

// const alreadyAddedThree = curriedAdd(3);
// console.log(alreadyAddedThree(4)); // 7

// function multiplyThreeNumbers(a, b, c) {
//   return a * b * c;
// }

// const curriedMultiplyThreeNumbers = curry(multiplyThreeNumbers);
// curriedMultiplyThreeNumbers(4)(5)(6); // 120

// const containsFour = curriedMultiplyThreeNumbers(4);
// const containsFourMulFive = containsFour(5);
// containsFourMulFive(6); // 120

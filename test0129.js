const add = (a) => a + 1;
const add2 = (a) => a + 2;

function compose(...fns) {
    return (args) => {
        let result = args;
        for (const fn of fns) {
            result = fn(result);
        }
        return result;
    }
}

const test1 = compose(add, add2)(3)
console.log(test1);
const testObj = {
    testFunc: function () {
        console.log('this in testFunc is:', this);
    }
};

// 1. call testFunc with testObj
testObj.testFunc();

const newTestFunc = testObj.testFunc;
// 2. call newTestFunc who is referencing from testObj.testFunc
newTestFunc();

const newObj = {};
// 3. call newTestFunc with apply
newTestFunc.apply(newObj);

const bindObj = { name: "bindObj" };
const boundFunc = testObj.testFunc.bind(bindObj);
// 4. call bounded testFunc
boundFunc();

const somethingElse = { name: "something else" };
boundFunc.apply(somethingElse);

let test = {
    name: 'ddd',
    get nameget() {
        return this.name;
    },
    fn() {
        console.log('object');
    }
}

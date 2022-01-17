'use strict';
function printName(str) {
    console.log(this);
    console.log(this.name);
    console.log('paramer is ' + str);
}
const person = {
    name: 'james',
    test() {
        console.log(this);
    }
}

// person.test();
// person.printName('hello')
// person.testArrow()
// printName('hello');
// printName.call(person, 'hello from call');
// printName.apply(person, ['hello from apply']);

const printNameBind = printName.bind(person);
// printNameBind('hello from bind');

function myCall(fn, thisObject, ...args) {
    thisObject.fn = fn;
    const result = thisObject.fn(...args)
    delete thisObject.fn;
    return result;
}

// myCall(printName, person, 'hello form my call')

function myApply(fn, thisObject, args) {

    // Symbol for unqique method name, as the name is temp
    const fnName = Symbol('fnName')
    thisObject[fnName] = fn;
    const result = thisObject[fnName](...args)
    delete thisObject[fnName];
    return result;
}

myApply(printName, person, ['hello form my apply'])

function myBind(fn, thisObject) {
    return (...args) => {
        fn.call(thisObject, args)
        // myCall(fn, thisObject, args)
    }
}

const myPersonBind = myBind(printName, person);

myPersonBind('hello form my bind');
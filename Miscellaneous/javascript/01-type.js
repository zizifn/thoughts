// 1. undefined
typeof undefined //"undefined"
void 0 //undefined

// 2. Null
typeof null // "object"
//https://stackoverflow.com/questions/18808226/why-is-typeof-null-object

// 3.Boolean
typeof true //"boolean"

// 4.String
// 不可变，值类型,不能单独修改string某个值，需要借助String wrapper 方法。
let str = "dd";
typeof str // "string"

// 5. Number

typeof 123 // "number"
// 浮点数计算有精度问题
0.1 + 0.2 === 0.30000000000000004
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);

//Symbol

var obj2 = {
    [Symbol.toPrimitive](hint) {
        if (hint == 'number') {
            return 10;
        }
        if (hint == 'string') {
            return 'hello';
        }
        return true;
    }
};


var o = new Object

o[Symbol.iterator] = function() {
    var v = 0
    return {
        next: function() {
            return { value: v++, done: v > 10 }
        }
    }
};

for(var v of o)
    console.log(v); // 0 1 2 3 ... 9

// use Symbol can 实现很多功能。
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// https://developer.mozilla.org/en-US/docs/Glossary/Symbol


//Object
Array.from("123456789").reduce(
    (previous, current, currentIndex, array) => {
        console.log("index" + currentIndex);
        console.log("array" + array);
        return previous + current;
    }, '');

//  iterable VS enumerable

// js 的自动封箱和装箱,混淆了primitive type 和object
console.log("abc".charAt(0)); // primitive type don't have method

// 类型转换

new Number(5) == "5" // true
new Number(5) === "5" // false


var symbolObject = (function(){ return this; }).call(Symbol("a"));

console.log(typeof symbolObject); //object
console.log(symbolObject instanceof Symbol); //true
console.log(symbolObject.constructor == Symbol); //true

// 拆箱

var o = {
    valueOf : () => {console.log("valueOf"); return {}},
    toString : () => {console.log("toString"); return {}}
}

o * 2
// valueOf
// toString
// TypeError


var o = {
    valueOf : () => {console.log("valueOf"); return {}},
    toString : () => {console.log("toString"); return {}}
}

o[Symbol.toPrimitive] = () => {console.log("toPrimitive"); return "hello"}


console.log(o + "")
// toPrimitive
// hello

console.log(o -2 ) // 当然可以通过增强Symbol.toPrimitive来handle number的case
// toPrimitive
// NaN

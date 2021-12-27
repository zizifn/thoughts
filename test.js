// document.getElementById("button1").addEventListener("click", click1, {
// })


// function click1(event) {
//     console.log(event.offsetX);
//     console.log(event.clientX);
//     console.log(event.pageX);
//     console.log(event.screenX);
//     console.log(this);
//     click2.call(this);
// }

// function click2() {
//     console.log("click2");
//     console.log(this);
// }

// document.getElementById("parentDiv").addEventListener(
//     "click", (event) => {
//         console.log("click parentDiv");
//         event.stopPropagation()
//     }
//     , false
// )


// let promise2 = Promise.resolve('ddd').then(1);

// promise2.then(console.log);


const test = {
    testf() {
        console.log(
            this
        );
    },

    testfun2: function () {
        console.log(
            this
        );
    }
};
// const fun1 = test.testf;
// new fun1()
const testfun2 = test.testfun2;
new testfun2()
// console.log('fun1 ' + fun1());

const test2 = function () {
    this.key2 = 'dd';
}

test2.prototype = {
    key1: 11
}

const testCreate = {}
Object.setPrototypeOf(testCreate, test2.prototype);
console.log(testCreate);

const test2Obj = new test2();
console.log(JSON.stringify(test2Obj));

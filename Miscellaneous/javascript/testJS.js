
// var testBol = new Boolean(true);
// // var testBol = true;


// function foo(){
//     console.log("this in foo "+ this);
//     foo1();
// }


// function foo1(param){
//     console.log("this in foo1 "+ this);
// }

// foo()

// function foo() {
//     this.testFooVar = "testFooVar"
//     this.log = function () {
//         console.log("ddddd")
//     }
// }

// Promise.resolve(new Error("dddd"));

// test = new foo
// test.log()

var bar = {
    myName: "bar object",
    printName: function () {
        console.log(myName)
    }
}

for (let a in bar) {
    console.log(a)
}

function test() {
    console.log(myName);
}

function foo() {
    let myName = "foo function"
    // return bar.printName
    // return () => console.log(myName);
    // return function() { console.log(myName);}
    return test;
}
let myName = "main method"
let _printName = foo()
_printName() // "main method"
bar.printName() // "main method"

function f() {
    let a = 2;
    {
        let a = 3;
    }

    console.log(a)

}


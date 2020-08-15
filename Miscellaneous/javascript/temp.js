// let test = {
//     a: 1,
//     testf: function (params) {
//         console.log(this.a);
//     }
// }

// // test.testf()

// // let test2 = Object.create(test);

// // console.log(test2.a);

// let testF = Object.create(Function);

// function f1() {
//     console.log("f1")
// }

// f1();
// console.log(testF);

const isSeeding = false;
const isdelete = true;
const istest = true;

if (isSeeding) {
    console.log("isseeding")
} else if (isdelete) {
    console.log("isdelete")
} else if (istest) {
    console.log("istest")
}



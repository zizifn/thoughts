// function testfun() {
//     let name;
//     return {
//         getName() {
//             return name;
//         },
//         setName: function (userName) {
//             name = userName;
//         },
//         get test() {
//             return '111';
//         }
//     }
// }
// let obj = testfun();
// obj.setName("test2")
// console.log(obj.test);

// console.log(obj.getName());

// obj = testfun();
// obj.setName("test1")
// console.log(obj.getName());

// let i = 0;
// for (i = 0; i < 10; i++) {
//     // setTimeout(
//     //     ((i) => {
//     //         return () => {
//     //             console.log(i);
//     //         }
//     //     })(i)
//     //     , 100)
//     setTimeout(() => {
//         console.log(i);
//     })
// }

class ClassWithPrivateField {
    #privateField;
    privateField;

    constructor() {
        this.#privateField = 42;
        this.privateField = 1;
    }
}

const instance = new ClassWithPrivateField()
Object.getOwnPropertyNames(instance);
console.log(instance);
// instance.#privateField === 42;

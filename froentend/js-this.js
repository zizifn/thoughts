class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name); // call the super class constructor and pass in the name parameter
    }

    speak() {
        console.log(`${this.name} barks.`);
    }
    test() {
        console.log('test');
    }
}

// obj = {
//     test: function () {

//     },
//     foo() {
//         console.log(this);
//         console.log(super.toString());
//     }
// }

// // 调用foo方法
// obj.foo();
{
    var a = 1;
    function a() { }
}

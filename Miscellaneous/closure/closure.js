var a = 0;

var fun1 = () => {
    var b = 0;
    return () => {
        a = a + 1;
        b = b + 1;
        return b;
    };
}

// outside: a=0
console.log("outside: a=%d", a);

var fun2 = fun1();

// fun2: b=1, a=1
// fun2: b=2, a=2
// b没有释放。。,相当于延长了b的生命
for (let i = 0; i < 2; i++) {
    console.log("fun2: b=%d, a=%d", fun2(), a);
}

var fun3 = fun1();
// fun3: b=1, a=3
// fun3: b=2, a=4
for (let i = 0; i < 2; i++) {
    console.log("fun3: b=%d, a=%d", fun3(), a);
}

//静态scope

// int i = 1;

// void foo() {
//     println(i);
// }

// foo(); -------这里访问的是全局变量

// void bar(){
//     var i = 2;
//     foo(); ------这里call foo， 也是全局变量，而不是局部。如果访问的是bar里面的i，那就是动态 dynamic dynamic scope
// }
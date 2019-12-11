let testStr:string = '';

if (testStr || testStr === '') {
    console.log("test str is true");
} else {
    console.log("test str is false");
}

var funTest = (s: string) => "test";

console.log(funTest('ddd'));

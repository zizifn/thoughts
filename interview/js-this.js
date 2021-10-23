let obj = {
    name: 'james',
    test() {
        console.log('test');
        console.log(this);
    },
    foo: function () {
        console.log(this);
    }
}
obj.foo()
const testf = obj.foo
// new testf()



new foo()
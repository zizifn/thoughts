const util = require('util');

// class Foo {
//     constructor() {
//         this.a = 42;
//         this.b = 43;
//     }

//     bar(str, callback) {
//         console.log(str)
//         // callback(null, this.a, this.b);
//         callback(null, 'a', 'b');

//     }
// }

// const foo = new Foo();

// const naiveBar = util.promisify(foo.bar);
// // TypeError: Cannot read property 'a' of undefined
// // naiveBar().then(a => console.log(a));

// naiveBar.call(foo, 'a').then(
//     ([a, b]) =>
//         console.log(a)
// ); // '42'

// const bindBar = naiveBar.bind(foo);
// bindBar().then((a) => console.log(a)); // '42'

function awkwardFunction(options, data, callback) {
    // do stuff ...
    let item = "stuff message"
    return callback(null, "response", "item")
}

let kptest = util.promisify(
    (options, data, cb) => awkwardFunction(
        options,
        data,
        (err, ...results) => cb(err, results)
    )
)

kptest({ doIt: true }, 'some data')
    .then(
        ([response, item]) => {
            console.log('iiii')
        }
    );
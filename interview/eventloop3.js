import { readFile } from 'fs'

console.log('-----------------------start--------------------');

// next tick
process.nextTick(
    () => {
        console.log('NT1: --nextTick1----')
    }
)
// IO polling
readFile('./dom.html', (error, res) => {
    console.log('-----readFile---IO polling----'); // thread pool polling
})

// set immediate
setImmediate(
    () => {
        console.log('----------setImmediate---------');
    }
)

// set timeout
setTimeout(
    () => {
        console.log('----------setTimeout---------');
    }, 0
)

//
console.time('add')
function add() {
    let count = 0;
    for (let index = 0; index < 100000000; index++) {
        count += index;
    }
    return count;
}
console.log(`----------user sync--${add()}------- `);
console.timeEnd('add')
// next tick
process.nextTick(
    () => {
        console.log('NT2: --nextTick2----')
    }
)


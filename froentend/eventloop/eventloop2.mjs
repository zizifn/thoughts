import { readFile } from "fs";
import { request } from "https";

console.log("index start");

// next tick
process.nextTick(() => {
    console.log("NT1: --nextTick1----");
});
// IO polling
readFile("./dom.html", (error, res) => {
    console.log("-----readFile---IO polling----"); // thread pool polling
});

const options = {
    hostname: "www.baidu.com",
    port: 443,
    path: "/img/PC_7ac6a6d319ba4ae29b38e5e4280e9122.png",
    method: "GET",
};
const req = request(options, (res) => {
    console.log("http request");
});

req.on("error", (error) => {
    console.error(error);
});

req.end();


// set immediate
setImmediate(() => {
    console.log("----------setImmediate---------");
});

// set timeout
setTimeout(() => {
    console.log("----------setTimeout---------");
}, 0);

//

function add() {
    let count = 0;
    for (let index = 0; index < 100000000; index++) {
        count += index;
    }
    return count;
}
console.log(`----------user sync--${add()}------- `);

Promise.resolve("promise").then((console.log));

console.log("index end");




// import { pbkdf2Sync } from "crypto";
// const startTime = Date.now();
// let index = 0;
// for (index = 0; index < 3; index++) {
//     pbkdf2Sync("secret", "salt", 100000, 64, "sha512");
//     const endTime = Date.now();
//     console.log(`${index} time, ${endTime - startTime}`);
// }
// const endTime = Date.now();
// // console.log(`in the end`);
// console.log(`last time, ${endTime - startTime}`);

// console.log(process.env.UV_THREADPOOL_SIZE);

// import { cpus } from "os";
// import { pbkdf2 } from "crypto";
// console.log(cpus().length);
// let startTime = console.time("time-main-end");
// for (let index = 0; index < 10; index++) {
//     startTime = console.time(`time-${index}`);
//     pbkdf2("secret", `salt${index}`, 100000, 64, "sha512", (err, derivedKey) => {
//         if (err) throw err;
//         console.timeEnd(`time-${index}`);
//     });
// }
// console.timeEnd("time-main-end");

import { request } from "https";
const options = {
    hostname: "www.baidu.com",
    port: 443,
    path: "/img/PC_7ac6a6d319ba4ae29b38e5e4280e9122.png",
    method: "GET",
};

let startTime = console.time(`main`);

for (let index = 0; index < 15; index++) {
    startTime = console.time(`time-${index}`);
    const req = request(options, (res) => {
        // console.log(`statusCode: ${res.statusCode}`);
        console.timeEnd(`time-${index}`);
        res.on("data", (d) => {
            // process.stdout.write(d);
        });
    });

    req.on("error", (error) => {
        console.error(error);
    });

    req.end();
}

console.timeEnd("main");
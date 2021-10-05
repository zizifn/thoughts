import { pbkdf2 } from "crypto";
import { cpus } from "os"
console.log(cpus().length);
let startTime = console.time("time-main")

// 告诉，pbkdf2是异步的，让面试者猜测时间

for (let index = 0; index < 5; index++) {
    startTime = console.time(`time-${index}`)
    pbkdf2("secret", `salt${index}`, 100000, 64, "sha512", (err, derivedKey) => {
        if (err) throw err;
        console.timeEnd(`time-${index}`)
    });
}
console.timeEnd('time-main');




// process.env.UV_THREADPOOL_SIZE = OS.cpus().length





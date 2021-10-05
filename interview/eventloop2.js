import { pbkdf2Sync } from "crypto";

const startTime = Date.now();

// 这里时间是同步增加的，尽量告诉，pbkdf2Sync 是同步的，让面试者猜测时间
let index = 0;
for (index = 0; index < 3; index++) {
    pbkdf2Sync("secret", "salt", 100000, 64, "sha512");
    const endTime = Date.now();
    console.log(`${index} time, ${endTime - startTime}`);
}
const endTime = Date.now();
console.log(`${index} time, ${endTime - startTime}`);
// 0 time, 185
// 1 time, 84
// 2 time, 279
// 3 time, 280

for (let index = 0; index >= 0; index++) {
    const derivedKey = pbkdf2Sync("secret", `salt${index}`, 100000, 64, "sha512");
    console.log(derivedKey.toString("hex"));
}


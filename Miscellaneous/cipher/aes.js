const crypto = require('crypto');
function hex2bin(hex) {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

let passphrase = "some passphrase"
let iv = crypto.randomBytes(16); // Initialization vector.
let salt = crypto.randomBytes(16);

// const binary = [...salt.toString('hex')].reduce(
//     (pre, current) => {
//         return pre + hex2bin(current)
//     },
//     []
// );
// console.log(salt.toString('hex'));
// console.log(salt.toString('hex').length);
// console.log(binary);
// console.log(binary.length);
let key = crypto.scryptSync(passphrase, salt, 16);
console.log(key.length);
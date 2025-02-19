let resolveG = null;
const p1 = new Promise((resolve, reject) => {
    resolveG = resolve;
});

p1.then((value) => {
    console.log(value);
});

setTimeout(() => {
    resolveG("Promise resolved");
}, 10000);
console.log("end of script");
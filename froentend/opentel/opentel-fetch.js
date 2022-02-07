const origin = fetch;
window.fetch = function fn(...args) {
    console.log('inside fetch');
    const url = args[0];
    let opt = args[1] || {};
    // add header

    opt.headers = { ...opt.headers, 'traceparent': 'test12' };
    const newArgs = [url, opt];
    return Reflect.apply(origin, window, newArgs);
}

function timeUp(fn) {
    const start = performance.now();
    return function (event) {
        const result = Reflect.apply(fn, this, arguments);
        const end = performance.now();
        console.log("time up is ", end - start, performance.now());
        return result;
    }
}

btn1.addEventListener('click', timeUp(() => {
    let result = 0;
    for (let index = 0; index < 10000; index++) {
        result += index;
    }
    console.log(result, performance.now());
}));

// btn1.addEventListener('click', async () => {
//     console.log("callback....");
//     const resp = await fetch("http://localhost:5000/froentend/zonejs/zonejs.html")
//     const text = await resp.text();
//     console.log(text);
// });



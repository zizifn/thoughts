window.concat = (a, b) => a + b;

function greeting() {
    return {
        fn: "alert",
        args: [
            {
                fn: "concat",
                args: [
                    "Hello, ",
                    {
                        fn: "prompt",
                        args: ["Who are you?"],
                    },
                ],
            },
        ],
    };
}

function interpret(json, knownTags) {
    if (json && json.fn) {
        if (knownTags[json.fn]) {
            let fn = knownTags[json.fn];
            let args = json.args.map((arg) => interpret(arg, knownTags));
            let result = fn(...args);
            return interpret(result, knownTags);
        } else {
            let args = json.args.map((arg) => interpret(arg, knownTags));
            return { fn: json.fn, args };
        }
    } else {
        return json;
    }
}

const step1 = greeting();
console.log(step1);
// {
//   fn: 'alert',
//   args: [{
//     fn: 'concat',
//     args: ['Hello, ', {
//       fn: 'prompt',
//       args: ['Who are you?']
//     }]
//   }]
// };

const step2 = interpret(step1, {
    // prompt: window.prompt,
    concat: (a, b) => a + b,
});
console.log(step2);
// {
//   fn: 'alert',
//   args: ['Hello, Dan']
// };

interpret(step2, {
    alert: window.alert,
    prompt: window.prompt,
});
// undefined

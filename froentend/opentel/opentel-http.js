// // import "zone.js";
// // import "zone.js/dist/zone-patch-fetch.js";
// // import "zone.js/dist/long-stack-trace-zone.js";

let rootZone = Zone.current;

// input1.addEventListener('change', (value) => {
//     console.log(value.target.value);
// });
const eventZone = rootZone.fork(
    {
        name: 'event lister',
        onHasTask(delegate, current, target, hasTaskState) {
            this.hasMicroTask = hasTaskState.microTask;
            this.hasMacroTask = hasTaskState.macroTask;
            if (!this.hasMicroTask && !this.hasMacroTask) {
                // this.vmTurnDone();
                console.log('no microTask');
                // testh3.textContent = obj.input;

            }
        },
        onScheduleTask(parentZoneDelegate, currentZone, targetZone, task) {
            console.log(task.type);

            return parentZoneDelegate.scheduleTask(targetZone, task);

        },
        onInvokeTask(parent, current, target, task, applyThis, applyArgs) {
            try {
                console.log('onInvokeTask');
                return parent.invokeTask(target, task, applyThis, applyArgs);
            } finally {
            }
        },
        // onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
        //     console.log('onInvoke');
        //     parentZoneDelegate.invoke(
        //         targetZone, delegate, applyThis, applyArgs, source);
        // },
        onIntercept(parentZoneDelegate, currentZone, targetZone, delegate, source) {
            console.log('onIntercept');
            // return currentZone.wrap(delegate);
            return parentZoneDelegate.intercept(targetZone, delegate, source);
        }
    });

let obj = {};
function warp(fn) {
    return function (event) {
        console.log(performance.now());
        eventZone.run(
            () => {
                Promise.resolve().then(() => {
                    Reflect.apply(fn, this, arguments);
                })
            }
        )
        console.log(performance.now());
    }

}

// btn1.addEventListener('click', (
//     (event) => {
//         console.log("callback....");
//         let result = 0;
//         for (let i = 1; i < 10000000; i++) {
//             result += i;
//         }
//         console.log(result)
//         console.log(event);
//     }
// ))

btn1.addEventListener('click', warp(
    (event) => {
        console.log("callback....");
        let result = 0;
        for (let i = 1; i < 10000000; i++) {
            result += i;
        }
        console.log(result)
        console.log(event);
    }
))

// btn1.addEventListener('click', () => {
//     eventZone.run(
//         () => {
//             Promise.resolve(1).then(
//                 () => {
//                     console.log("callback....");
//                     let result = 0;
//                     for (let i = 1; i < 10000000; i++) {
//                         result += i;
//                     }
//                     console.log(result)
//                 }
//             )

//         })
// });

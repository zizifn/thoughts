import "zone.js/dist/zone.js";
import "zone.js/dist/long-stack-trace-zone.js";

let rootZone = Zone.current;

// input1.addEventListener('change', (value) => {
//     console.log(value.target.value);
// });

let obj = {};
input1.addEventListener('change',
    rootZone.fork(
        {
            name: 'event lister',
            onHasTask(delegate, current, target, hasTaskState) {
                this.hasMicroTask = hasTaskState.microTask;
                this.hasMacroTask = hasTaskState.macroTask;
                if (!this.hasMicroTask && !this.hasMacroTask) {
                    // this.vmTurnDone();
                    console.log('no microTask');
                    testh3.textContent = obj.input;

                }
            },
            onInvokeTask(parent, current, target, task, applyThis, applyArgs) {
                try {
                    console.log('onInvokeTask');
                    return parent.invokeTask(target, task, applyThis, applyArgs);
                } finally {
                }
            },
            onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
                console.log('onInvoke');
                if (delegate) {
                    parentZoneDelegate.invoke(
                        targetZone, delegate, applyThis, applyArgs, source);
                }
            },
            onIntercept(parentZoneDelegate, currentZone, targetZone, delegate, source) {
                console.log('onIntercept');
                // return currentZone.wrap(delegate);
                return parentZoneDelegate.intercept(targetZone, delegate, source);
            }


        }
    ).wrap((value) => {
        console.log("callback....");

        setTimeout(() => {
            console.log(value.target.value);
            obj.input = value.target.value;
        })
        // console.log(value.target.value);
    }));
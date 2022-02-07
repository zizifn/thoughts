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
        onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
            console.log('onInvoke');
            parentZoneDelegate.invoke(
                targetZone, delegate, applyThis, applyArgs, source);
        },
        onIntercept(parentZoneDelegate, currentZone, targetZone, delegate, source) {
            console.log('onIntercept');
            // return currentZone.wrap(delegate);
            return parentZoneDelegate.intercept(targetZone, delegate, source);
        }
    });

let obj = {};

btn1.addEventListener('click', () => {
    eventZone.run(
        async () => {
            console.log("callback....");

            // setTimeout(() => {
            //     console.log('setTimeout inside');
            // })
            // console.log(value.target.value);
            // const resp = fetch("http://localhost:5000/froentend/zonejs/zonejs.html").then(
            //     resp1 => {
            //         const text = resp1.text()
            //         return 'ddddd';
            //     }
            // ).then(data => {
            //     console.log(data);
            // });

            // const resp = await fetch("http://localhost:5000/froentend/zonejs/zonejs.html")
            // const text = await resp.text();

            function reqListener() {
                console.log(this.responseText);
            }

            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("GET", "http://localhost:5000/froentend/zonejs/zonejs.html");
            oReq.send();
            console.log('ddddddd');
        })
});

// // function observer_callback(list, observer) {
// //     console.log(list);
// // }
// // setTimeout(
// //     () => {
// //         let observer = new PerformanceObserver(observer_callback);
// //         observer.observe({ entryTypes: ["paint", "measure", "resource"] });
// //     }, 1000
// // )


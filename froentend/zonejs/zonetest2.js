import "zone.js/dist/zone.js";
import "zone.js/dist/long-stack-trace-zone.js";
// import "zone.js/dist/zone";

// RootZone is ambient and it is indistinguishable from no Zone.
let rootZone = Zone.current;
// We create a new zone by forking an existing zone.
let zoneA = rootZone.fork({ name: 'zoneA' });
let zoneB = rootZone.fork(
    {
        name: 'zoneB',
        onInvoke: function (parentZoneDelegate, currentZone, targetZone,
            callback, applyThis, applyArgs, source) {
            var start = performance.now();
            console.log("onInvoke start", start);
            parentZoneDelegate.invoke(
                targetZone, callback, applyThis, applyArgs, source);
            var end = performance.now();
            console.log(
                'Zone:', targetZone.name,
                'Intercepting zone(onInvoke):', currentZone.name,
                'Duration:', end - start)
        },
        // onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
        //     var start = performance.now();
        //     console.log("onInvokeTask start", start);
        //     delegate.invokeTask(target, task, applyThis, applyArgs);
        //     var end = performance.now();
        //     console.log("onInvokeTask end", end);

        //     console.log(
        //         'onInvokeTask - Zone:', target.name,
        //         'Intercepting zone(onInvokeTask):', current.name,
        //         'Duration:', end - start)
        // },
    }
);


// // Each zone has a name for debugging
// expect(rootZone.name).toEqual('<root>');
// expect(zoneA.name).toEqual('zoneA');
// // Child zone knows about its parent zone. (one way reference)
// expect(zoneA.parent).toBe(rootZone);

function main() {
    var start = performance.now();
    console.log("main start", start);
    setTimeout(
        () => {
            console.log("set timeout callback", Zone.current.name, performance.now());
        }, 2000
    );
    Promise.resolve('resolve').then(() => {
        console.log("promise");
    }).then(
        () => {
            console.log("promise2 then");
        }
    )
}

zoneB.run(main);

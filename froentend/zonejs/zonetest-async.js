import "zone.js/dist/zone.js";
import "zone.js/dist/long-stack-trace-zone.js";
let rootZone = Zone.current;
const asyncSpec = {
    name: 'SyncZone',
    eventTasks: [],
    // onInvoke: function (parentZoneDelegate, currentZone, targetZone,
    //     callback, applyThis, applyArgs, source) {
    //     var start = performance.now();
    //     console.log("onInvoke start", start);
    //     parentZoneDelegate.invoke(
    //         targetZone, callback, applyThis, applyArgs, source);
    //     var end = performance.now();
    //     console.log(
    //         'Zone:', targetZone.name,
    //         'Intercepting zone(onInvoke):', currentZone.name,
    //         'Duration:', end - start)
    // },
    onScheduleTask(parentZoneDelegate, currentZone,
        targetZone, task) {
        // Whenever new EventTask is scheduled add it to the
        // outstanding list of tasks.
        // if (task.type == 'eventTask') {
        //     this.eventTasks.push(task);
        // }
        console.log(task.type);
        return parentZoneDelegate.scheduleTask(targetZone, task);
        // throw new Error('No Async work is allowed in test.');
    },
    cleanup() {
        for (; this.eventTasks.length;) {
            Zone.current.cancelTask(this.eventTasks.pop())
        }
    },
    onHasTask(delegate, current, target, hasTaskState) {
        console.log(hasTaskState);
    }

};
const asyncZone = rootZone.fork(asyncSpec);


function syncOnly(fn) {

    return function (...args) {
        asyncZone.run(fn, this, args)
    }
}
function main() {
    console.log('this', this);
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

const testThis = {
    name: 'test this',
    fn: syncOnly(main)
}

testThis.fn();


import "zone.js/dist/zone.js";
import "zone.js/dist/long-stack-trace-zone.js";

// console.log(Zone.root);

function main() {
    b1.addEventListener('click', bindSecondButton);
}

/*
 * What if your stack trace could tell you what
 * order the user pushed the buttons from the stack trace?
 *
 * What if you could log this back to the server?
 *
 * Think of how much more productive your debugging could be!
 */

function bindSecondButton() {
    b2.addEventListener('click', throwError);
}


function throwError() {
    throw new Error('aw shucks');
}

// main();
/*
 * Bootstrap the app
 */
//main();
Zone.current.fork(
    {
        name: 'error',
        onHandleError: function (parentZoneDelegate, currentZone, targetZone, error) {
            console.log(error.stack);
        }
    }
).fork(Zone.longStackTraceZoneSpec).run(main)
// import { Subject } from "rxjs"
// import { distinctUntilChanged, distinct } from "rxjs/operators"
var equal = require('fast-deep-equal');
var rxjs = require('rxjs');
var rxjsOper = require('rxjs/operators');
var lodash = require('lodash')
var subject = new rxjs.BehaviorSubject({});


var b = {
    a: [1, '3', 4]
};
var test = {
    name: "name1",
    b: b,
    a: 1

}

var test2 = {
    name: "name2",
    a: 1,
    b: {
        a: [1, '3', 4]
    }
}

subject.pipe(
    rxjsOper.map(lodash.cloneDeep),
    // rxjsOper
    rxjsOper.distinctUntilChanged(equal)
    // rxjsOper.distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
).subscribe(
    value => console.log('changed ' + JSON.stringify(value))
);
console.log(equal(test, test2))

subject.next(test);
test.b.test = 1;
subject.next(test);





const fromEvent = rxjs.fromEvent;
const from = rxjs.from;
const fromFetch = rxjs.fetch.fromFetch;
const interval = rxjs.interval;
const Observable = rxjs.Observable;
const of = rxjs.of;
const Subject = rxjs.Subject;
const map = rxjs.operators.map;
const tap = rxjs.operators.tap;
const take = rxjs.operators.take;
const throttleTime = rxjs.operators.throttleTime;
// wait for some time, reduce http request
const debounceTime = rxjs.operators.debounceTime;
const distinctUntilChanged = rxjs.operators.distinctUntilChanged;
const scan = rxjs.operators.scan;
const reduce = rxjs.operators.reduce;
const pluck = rxjs.operators.pluck;
const mergeMap = rxjs.operators.mergeMap;
const concatMap = rxjs.operators.concatMap;
const switchMap = rxjs.operators.switchMap;
const exhaustMap = rxjs.operators.exhaustMap;
const filter = rxjs.operators.filter;
const startWith = rxjs.operators.startWith;

const url1 = "https://raw.githubusercontent.com/zizifn/thoughts/master/data/primers/chapter-1.json";
const url2 = "https://raw.githubusercontent.com/zizifn/thoughts/master/data/primers/chapter-2.json";
const url3 = "https://raw.githubusercontent.com/zizifn/thoughts/master/data/primers/chapter-3.json";
const urls = [url1, url2, url3];
let index = 0;
const concatMapButton = document.querySelector('#concatMap');
fromEvent(concatMapButton, 'click').pipe(
    concatMap(
        (event, ind) => {
            console.log('concatMap ' + ind);
            // interval(1000).pipe(take(4));
            return fetch(urls[index++ % 3]);
        }
    )
).subscribe(
    (value) => console.log(value),
    (error) => console.log(error),
    () => console.log("complete"))

let mergeMapIndex = 0;
const mergeMapButton = document.querySelector('#mergeMap');
fromEvent(mergeMapButton, 'click').pipe(
    mergeMap(
        (event, ind) => {
            console.log('mergeMap ' + mergeMapIndex);
            // interval(1000).pipe(take(4));
            return fetch(urls[mergeMapIndex++ % 3]);
        }
    )
).subscribe(
    (value) => console.log(value),
    (error) => console.log(error),
    () => console.log("complete"))

let switchMapIndex = 0;
const switchMapButton = document.querySelector('#switchMap');
fromEvent(switchMapButton, 'click').pipe(
    switchMap(
        (event, ind) => {
            console.log('switchMap ' + switchMapIndex);
            // return interval(1000).pipe(take(4));
            return fromFetch(urls[switchMapIndex++ % 3]);

        }
    )
).subscribe(
    (value) => console.log(value),
    (error) => console.log(error),
    () => console.log("complete"))

let exhaustMapIndex = 0;
const exhaustMapButton = document.querySelector('#exhaustMap');
fromEvent(exhaustMapButton, 'click').pipe(
    exhaustMap(
        (event, ind) => {
            console.log('exhaustMap ' + exhaustMapIndex);
            // interval(1000).pipe(take(4));
            return fromFetch(urls[exhaustMapIndex++ % 3]);
        }
    )
).subscribe(
    (value) => console.log(value),
    (error) => console.log(error),
    () => console.log("complete"))


// const source$ = new Subject();
// const inner$ = new Subject();
// const handle = v => {
//     // if (v === 0) {
//     //     source$.next(1);
//     //     return rxjs.empty();
//     // }
//     // return rxjs.empty();

//     return inner$;
// }

// source$.pipe(
//     tap(e => console.log('source:', e)),
//     // .delay(1)
//     // .switchMap(v => Observable.of(null).switchMap(() => handle(v)))
//     mergeMap(v => handle(v))
// )
//     .subscribe(e => console.log('handle:', e),
//         () => console.log('error'),
//         () => console.log('done'))


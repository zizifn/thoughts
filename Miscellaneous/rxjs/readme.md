# RXJS

这个 readme 的目的仅仅是为了自己。。

## mergeMap/flatMap switchMap switchMap exhaustMap concatMap

什么区别？？忘记了就去看文档或者自己写的例子。 [refer1](https://blog.angular-university.io/rxjs-higher-order-mapping/)

### concatMap

Inner observable 是串行的。但是 inner observable 不会被取消。等待前面的完成，后面 inner observable 继续触发。
请观察 sample network。

[rxjs doc](https://rxjs-dev.firebaseapp.com/api/operators/concatMap)

[live sample](./readme-xxx-Map.html)

### mergeMap/flatMap

前一个 inner observable 没有必要先完成，后面也会触发。对比 `concatMap` 这个就是并发。当 `concurrent` 等于 1 的时候，mergeMap 就是 `concatMap`。。 only `mergeMap` 有`concurrent`的设置。
请观察 sample network。

[rxjs doc](https://rxjs-dev.firebaseapp.com/api/operators/mergeMap)

[live sample](./readme-xxx-Map.html)

### switchMap

前一个 inner observable 没有先完成，后面 inner observable 会 cancel 前面的 observable 。这意味这，只能有一个 inner observable。。所以也是串行的。
请观察 sample network。

[rxjs doc](https://rxjs-dev.firebaseapp.com/api/operators/switchMap)

[live sample](./readme-xxx-Map.html)

### exhaustMap

前一个 inner observable 没有先完成，后面 inner observable 不会触发。所以也是串行的。
请观察 sample network。

> 注意，concatMap 会串行执行后面的 inner observable，但是 exhaustMap 不会。exhaustMap 会 cancel 后面的。

[rxjs doc](https://rxjs-dev.firebaseapp.com/api/operators/exhaustMap)

[live sample](./readme-xxx-Map.html)

## Catch error and continue

RXJS 的 `observable` 遇到 error 会 end。如果 inner `observable` 是 HTTP 的请求，需要这样做。
[sample code](./11-switchMap.html)

```javascript
function checkOuter(value) {
            if (value === 4) {
                throw new Error('error in check')
            }
            return value;
        }
        s1.pipe(
          // filter(checkOuter),// 把可能出现的error的，炒作放入到 switchMap，这样就不会end source observable
            switchMap(
                (value) =>
                    of(value).pipe(
                        filter(checkOuter), // 放在这里。
                        catchError(error => {
                            console.log('inner observable error');
                            return of('inner error catch');
                        })
                    )
            ),

            catchError(error => {
                console.log('outer observable error');
                return of('outer error catch');
            })
        ).subscribe((e) => {
            try {
                console.log("sub" + e)
            } catch {

            }
        }
```

```js
observableThatShouldNotCompleteOnError.flatMap((e) =>
  obsrevableThatMayThrow(e).onErrorResumeNext(Observable.empty())
);
```

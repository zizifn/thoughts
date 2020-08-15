# RXJS

这个 readme 的目的仅仅是为了自己。。

## mergeMap/flatMap VS switchMap

什么区别？？忘记了就去看文档或者自己写的例子。

## Catch error and continue

RXJS 的 `observable` 遇到 error 会 end。如果 inner `observable` 是 HTTP 的请求，需要这样做。
[sample code](./11-switchMap.html)

```js
observableThatShouldNotCompleteOnError.flatMap((e) =>
  obsrevableThatMayThrow(e).onErrorResumeNext(Observable.empty())
);
```

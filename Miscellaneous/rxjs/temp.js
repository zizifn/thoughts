observableThatShouldNotCompleteOnError.flatMap(e =>
    obsrevableThatMayThrow(e)
        .onErrorResumeNext(Observable.empty())
);
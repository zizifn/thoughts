# 从 0 写个微小的 Javascript 运行时(06) -添加 setTimeout

## 代码

https://github.com/zizifn/toy-js-runtime/tree/part4-add-settimeout

> 代码一般会按照一篇文章一个branch。这样方便大家查看。

## setTimeout

既然我们把 libuv 加进来了，就让我们感受下 libuv 的实力，实现一个 `setTimeout` 吧。

### spec

[MDN setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)

[html spec setTimeout](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout-dev)

```
id = self.setTimeout(handler [, timeout [, ...arguments ] ])
```

## setTimeout C binding

因为 `setTimeout` 是一个全局函数，所以我们需要把它添加到 `global` 对象上。

```c
static JSValue js_setTimeout(JSContext *ctx, JSValueConst this_val,
                            int argc, JSValueConst *argv)
{
    printf("setTimeout------\n");
    return JS_UNDEFINED;
}


static void js_add_custom_helpers(JSContext *ctx)
{
    JSValue global_obj;
    // 获取全局对象
    global_obj = JS_GetGlobalObject(ctx);
    // 我们定义一个 JS function in C。这样我们就可以在JS中调用这个函数。
    JSValue setTimeout = JS_NewCFunction(ctx, js_setTimeout, "setTimeout", 1);
    // 把这个函数添加到全局对象中
    JS_SetPropertyStr(ctx, global_obj, "setTimeout", setTimeout);
    JS_FreeValue(ctx, global_obj);
}
```


## 使用 `uv_timer_t` 实现 setTimeout

```c

static void timer_cb(uv_timer_t *timer) {
    JSTimerInfo *info = timer->data;
    // 执行 js 函数
    JSValue ret = JS_Call(info->ctx, info->fn, JS_UNDEFINED, 0, NULL);
    printf("timer_cb------%s\n", JS_ToCString(info->ctx, ret));
    JS_FreeValue(info->ctx, ret);
    JS_FreeValue(info->ctx, info->fn);
    js_free(info->ctx, info);
}


static JSValue js_setTimeout(JSContext *ctx, JSValueConst this_val,
                            int argc, JSValueConst *argv)
{
    printf("js_setTimeout------\n");
    // 
    if(argc < 2)
        return JS_EXCEPTION;
    // setTimeout(fn, delay)
    // 第一个参数是一个js 函数
    JSValue fn = argv[0];
    if(!JS_IsFunction(ctx, fn))
    return JS_ThrowTypeError(ctx, "not a function");
    // 第二个参数是一个数字
    int delay = JS_VALUE_GET_INT(argv[1]);

    JSTimerInfo *info = js_mallocz(ctx, sizeof(*info));
    info->ctx = ctx;
    // 这里需要 dup 一下，参数会被quickjs 自动释放
    info->fn = JS_DupValue(ctx, argv[0]);

    // 初始化一个 uv_timer_t
    uv_timer_init(uv_default_loop(), &info->handle);
    // 因为我们需要在 timer_cb 中使用这个参数，所以我们把这个参数放到 handle 的 data 中
    info->handle.data = info;
    uv_timer_start(&info->handle, timer_cb, delay, 0);
    return JS_UNDEFINED;
}

```

## 运行

修改 `src/test.js` 文件，添加如下代码：
```javascript
setTimeout(() => {
    console.log('hello world');
}, 1000);
```

校验程序是否运行正常。

```bash
mkdir build
cd build
cmake ..
make
./toyjsruntime ./src/test.js
``` 

## 不完美

这里我们实现的 `setTimeout` 只是一个简单的实现。它并不完美。我么没有办法 clearTimeout。也没有办法传递参数。

这里需要和上一篇文章的 `idle` handler 结合类似。不过这次我们需要把 `timer` handler 放入到 JSRuntime，伪代码如下。这里我就不详细解释了，具体实现请参考代码。

https://github.com/zizifn/toy-js-runtime/blob/part4-add-settimeout/src/main.c

```c
typedef struct JSRuntimeAddinfo
{
    struct list_head idle_handlers;
    struct list_head timer_handlers;
    int64_t next_timer_id;
} JSRuntimeAddinfo;
```



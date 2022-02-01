# 为什么说 Node.js 不是完全的单线程

相信大家都知道 node.js 是一个单线程程序，使用了 Event Loop 可以做到多并发。可惜这是不完全正确的。

那么为什么说 Node.js 不是完全的单线程的程序呢？

## Node.js 是单线程的程序*

所有我们自己写的 Javsacript，V8, event loop都跑在同一个线程里面，也就是 main thrad。

哎嗨，这不正说明 node 是单线程的吗？

但是也许你不知道 node 有很多模块背后都是 C++ code。

虽然 node 没有给使用者暴露控制 thread 的权限，但是 C++ 是可以使用多线程的。

那么什么时候 node 会使用多线程呢？

1. 如果一个 node 方法，背后调用C++的**同步**方法，那么都是跑在 main thread 里面的。

2. 如果一个 node 方法，背后调用C++的**异步**方法，有时候不是跑在 main thread 里面的。

> Talk is cheap, show me the code.

### 同步方法，跑在 main thread 里面

这里 `crypto` 相关模块，很多是 C++ 写的。下面一段程序是计算hash的函数，一般用来存储密码。

``` js
import { pbkdf2Sync } from "crypto";
const startTime = Date.now();
let index = 0;
for (index = 0; index < 3; index++) {
    pbkdf2Sync("secret", "salt", 100000, 64, "sha512");
    const endTime = Date.now();
    console.log(`${index} time, ${endTime - startTime}`);
}
const endTime = Date.now();
console.log(`in the end`);
```

输出的时间，

``` text
0 time, 44 
1 time, 90
2 time, 134
in the end
```

可以看到每次大概都是花费~45ms，代码 main thread 上顺序执行。

> 注意最后的输出是谁？
> 注意这里一次 hash 在我的 cpu 需要~45ms。

### 异步 pbkdf2 方法，不跑在 main thread 里面

```js
import { cpus } from "os";
import { pbkdf2 } from "crypto";
console.log(cpus().length);
let startTime = console.time("time-main-end");
for (let index = 0; index < 4; index++) {
    startTime = console.time(`time-${index}`);
    pbkdf2("secret", `salt${index}`, 100000, 64, "sha512", (err, derivedKey) => {
        if (err) throw err;
        console.timeEnd(`time-${index}`);
    });
}
console.timeEnd("time-main-end");
```

输出的时间，

``` text
time-main-end: 0.31ms
time-2: 45.646ms
time-0: 46.055ms
time-3: 46.846ms
time-1: 47.159ms
```

这里看到，main thread 早早结束，然而每次计算的时间都是45ms，要知道一个 cpu 计算 hash 的时间是45ms，这里 node 绝对使用了多个线程进行hash计算。

如果我这里把调用次数改成10次，那么时间如下，可以看到随着CPU核数的用完，时间也在增加。再一次证明node 绝对使用了多个线程进行hash计算。

``` text
time-main-end: 0.451ms
time-1: 44.977ms
time-2: 46.069ms
time-3: 50.033ms
time-0: 51.381ms
time-5: 96.429ms // 注意这里，从第五次时间开始增加了
time-7: 101.61ms
time-4: 113.535ms
time-6: 121.429ms
time-9: 151.035ms
time-8: 152.585ms
```

虽然这里证明了，node绝对启用了多线程。但是有一点点小小的问题？我的电脑的CPU是AMD R5-5600U，有6个核心12线程啊。但是为什么时间是从第五次开始增加的呢，node没有完全利用我的CPU啊？

原因是什么呢？

Node 使用了预定义的线程池，这个线程池的大小默认是4.

> export UV_THREADPOOL_SIZE=6

让我们在看一个例子，

### HTTP request

```javascript
import { request } from "https";
const options = {
  hostname: "www.baidu.com",
  port: 443,
  path: "/img/PC_7ac6a6d319ba4ae29b38e5e4280e9122.png",
  method: "GET",
};

let startTime = console.time(`main`);

for (let index = 0; index < 15; index++) {
  startTime = console.time(`time-${index}`);
  const req = request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    console.timeEnd(`time-${index}`);
    res.on("data", (d) => {
      // process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
}

console.timeEnd("main");
```

``` text
main: 13.927ms
time-2: 83.247ms
time-4: 89.641ms
time-3: 91.497ms
time-12: 91.661ms
time-5: 94.677ms
.....
time-8: 134.026ms
time-1: 143.906ms
time-13: 140.914ms
time-10: 144.088ms
```

这里主程序也早早结束了，这里我启动 http request 去下载15次图片，他们花费的时间并没有成倍增加，似乎不受限于线程池/cpu的影响。

为什么啊？？Node 到底有没有在使用线程池啊？

如果 Node 背后的 C++ 的**异步**方法，首先会尝试是否有内核异步支持，比如这里网络请是使用 epoll （Linux），如果内核没有提供异步方式，Node才会使用自己的线程池。。

所以 http 请求虽然是异步，不过是由内核实现的，等到内核完成后，会通知C++， C++会通知给 main thread 处理callback。

那么 Node 哪些异步方法会使用线程池呢？哪些不会呢？

1. 原生 Kernal Async
    - TCP/UDP server client
    - Unix Domain Sockets (IPC)
    - pipes
    - dns.resolveXXX
    - tty input(stdin etc)
    - Unix signals
    - Child process

2. Thread pool
    - fs.*
    - dns.lookup
    - pipe (edge case)

这也是大部分 Node 优化的切入点。

但是这些怎么和最重要的 Event Loop 结合起来呢？

### Event Loop

相信大家都对 Event loop 非常熟悉了。Event loop 好比一个分发员，

1. 如果是遇到普通 javascript 程序或者是 callback，交给 V8 处理。
2. 如果遇到同步方法后背是 C++ 写的，交给C++，跑在 main thread。
3. 如果遇到**异步**方法后背是 C++ 写的，如果有内核异步支持，从main thread 交给内核处理。
4. 如果是**异步**方法后背是 C++ 写的，如果没有内核异步支持，从 main thread 交给 thread pool。
5. thread pool 和内核有结果都会把结果返回 event loop，如果注册的有 javascript callback，就交给V8进行处理。

然后如此循环，直到没有东西可以处理。

**所以 Node 不完全是单线程程序。**

> Reference
> [The Node.js Event Loop: Not So Single Threaded](https://www.youtube.com/watch?v=zphcsoSJMvM)
> [Everything You Need to Know About Node.js Event Loop - Bert Belder, IBM](https://www.youtube.com/watch?v=PNa9OMajw9w)

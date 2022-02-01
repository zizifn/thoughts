# Node.js 是怎么解决多任务问题的？

在回答这个问题之前，让我们回顾下，为什么会有多任务这种东西？

## 多任务 Multi Tasking

很久之前，我们的程序，都是单线程的，没有多任务的概念。因为一台计算机上只运行一个程序。

### 协作式多任务 Cooperative multi-tasking

但是随着计算的发展，硬件也越来越强大，多任务的需求就出现了。

协作式多任务工作方式如下，

1. APP1 独占整个计算机在运气
2. APP2 运行完，会调用 yield， 告诉操作系统自己完事了
3. 操作系统会把计算机给 APP2
4. 如此反复。

看起来不错，但是这种方式有些问题。如果有有些应用程序没有调用yield，那么这个程序就会一直占用计算资源，其他程序就无法运行。其实Windows 95/98 就是这样工作的，经常一个程序就可以干掉一个系统。

虽然有问题，但是我们可以多任务。

### 抢占式多任务处理 Preemptive multitasking

抢占式多任务处理工作方式如下，

1. 操作系统会使用CPU 时间片的方式，调度所有程序。
2. 如果一个 process 时间片到了，操作系统会把堆栈信息，保持到 memory 中，然后让另外一个process 运行。

Window NT 引入了这个，我们熟悉的 XP 就是这样工作的。

虽然可以多任务，但是在 process 始终运行在一个CPU上。 那么怎么才能高效利用CPU呢？

## Synmmetric multi Threading （SMT）

这是 CPU 级别的功能，OS 利用这种新的指令，可以做到让一个 process 在多个CPU上运行。

目前绝大部分系统的线程调度都是交个操作系统去调度的，这样操作系统才能利用SMT，做到一个process在多个cpu上运行。

虽然线程的调度是由操作系统来完成的，但是数据的共享是由程序员来完成的。多线程程序是很难写的。

既然很难，那么Node.js 怎么搞定的呢？

**如果解决不了问题，那么我们可以选择消灭问题**。Node.js 是一个单线程。。哎嘿，搞定！！

## Node.js 是单线程

所有我们自己写的 javsacript，V8, event loop 都跑在同一个线程里面，也就是 main thrad。既然没有多线程，也就不用面对多线程问题。

> 这里不完全正确，详情见：[为什么说 Node.js 不是完全的单线程](./node-single-threading.md)

但是，Node 怎么做到不使用多线程而做到多任务处理的呢？

## Event Loop

在讨论 event loop 之前，我们先了解下，Node.js 程序都有什么组成？

1. 用户自己写的 JavaScript code 处理自己业务逻辑
2. 定时器
3. 网络请求/IO
4. Promise
5. process.nextTick()
6. etc

## How Event Loop works？

下面是一个 event loop 全部执行过程，我将会用一段代码，来详细阐述这个过程。

``` text
   ┌───────────────────────────┐
   │      index.js(主程序)      │
   └─────────────┬─────────────┘
   ┌───────────────────────────┐
┌─>│           timers          │<------setTimeout
│  └─────────────┬─────────────┘
|  ┌───────────────────────────┐
|  │           Javascript      │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
|  ┌───────────────────────────┐
|  │           Javascript      │
│  └─────────────┬─────────────┘
│  ┌─────────────|─────────────┐     
│  │     check(setImmediate)   │
│  └─────────────┬─────────────┘
|  ┌───────────────────────────┐
|  │           Javascript      │
│  └─────────────┬─────────────┘
|  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └─────────────|─────────────┘
   ┌─────────────|─────────────┐
   │       process.exit        │
   └─────────────-─────────────┘
Each box will be referred to as a "phase" of the event loop.
```

### 代码分析

如果下面是我们我们的 `index.js`, 我们运行 `node index.js`, event loop 会执行什么呢？

``` js
import { readFile } from "fs";
import { request } from "https";

console.log("index start");

// next tick
process.nextTick(() => {
    console.log("NT1: --nextTick1----");
});
// IO polling
readFile("./dom.html", (error, res) => {
    console.log("-----readFile---IO polling----"); // thread pool polling
});

const options = {
    hostname: "www.baidu.com",
    port: 443,
    path: "/img/PC_7ac6a6d319ba4ae29b38e5e4280e9122.png",
    method: "GET",
};
const req = request(options, (res) => {
    console.log("http request");
});
req.end();

// set immediate
setImmediate(() => {
    console.log("----------setImmediate---------");
});

// set timeout
setTimeout(() => {
    console.log("----------setTimeout---------");
}, 0);

function add() {
    let count = 0;
    for (let index = 0; index < 100000000; index++) {
        count += index;
    }
    return count;
}
console.log(`----------user sync--${add()}------- `);

Promise.resolve("promise").then((console.log));

console.log("index end");
```

### index.js

首先 Node 的主线程会执行index.js。注意此时还没有进入循环。下面步骤同步执行，

1. 执行 console.log("index start");
2. 执行 process.nextTick， 并且把 callback 加入到 nextTick 队列中
3. 执行 readFile，并且把 callback 加入到 IO polling 队列中
4. 执行 http request，并且把 callback 加入到 IO polling 队列中
5. 执行 setImmediate，并且把 callback 加入到 setImmediate 队列中
6. 执行 setTimeout，并且把 callback 加入到 Timers 队列中
7. 执行 console.log， 并且同步调用 add 方法,进行加法运算
8. 执行 Promise.resolve，并且把 callback 加入到 Promise 队列中
9. 执行 console.log("index end");

然后 index.js 执行基本完毕，但是需要清空，nextTick 队列和Promise 队列.

1. 检查 nextTick 队列，如果有 callback，则执行 callback
2. 检查 Promise 队列，如果有 callback，则执行 callback

> nextTick 队列 和 Promise 队列 不分先后。如果 Promise 队列 callback 生成 promise，会继续执行。并且block main thread

然后index.js 执行完毕，进入 event loop 循环。

### event loop 第一次 loop

1. 检查有没有 timer 定时器，如果有，执行 javascript callback
   - 这里有个 setTimeout， 所以会执行 setTimeout callback
2. 检查有没有 IO polling ，如果有，执行 javascript callback
    - 这里文件读取没有完成，不会执行 callback
    - 这里 http request 没有完成，不会执行callback
3. 检查有没有 setImmediate，如果有，执行 javascript callback
    - 这里有个 setImmediate， 所以会执行 setImmediate callback

> 这里setTimeout(()=>{},0) 和 setImmediate，顺序没有绝对先后。

这里的每一个 javascript callback 都需要在结束前，都会执行如下操作，

1. 检查 nextTick 队列，如果有，则执行 callback
2. 检查 Promise 队列，如果有，则执行 callback

### event loop 第二次loop

1. 检查有没有 timer 定时器，如果有，执行 javascript callback
   - 这里没有，不执行。
2. 检查有没有 IO polling，如果有，执行 javascript callback
    - 这里文件读取完成，执行 文件读取 callback
    - 这里 http request 没有完成，不会执行callback
3. 检查有没有 setImmediate，如果有，执行 javascript callback
    - 这里没有，不执行。

### event loop 第三次loop

1. 检查有没有 timer 定时器，如果有，执行 javascript callback
   - 这里没有，不执行。
2. 检查有没有 IO polling，如果有，执行 javascript callback
    - 这里 http request 完成，执行callback
3. 检查有没有 setImmediate，如果有，执行 javascript callback
    - 这里没有，不执行。

然后，event loop 没有任何事件，exit loop。程序结束。

**这就是 Node 解决多任务问题的方式。**

如果感兴趣，可以结合另一篇文章，一起阅读。[为什么说 Node.js 不是完全的单线程](./node-single-threading.md)

> Reference
> [Jake Archibald: 在循环](https://www.youtube.com/c/JSConfEU)
> [The Node.js Event Loop: Not So Single Threaded](https://www.youtube.com/watch?v=zphcsoSJMvM)
> [Everything You Need to Know About Node.js Event Loop - Bert Belder, IBM](https://www.youtube.com/watch?v=PNa9OMajw9w)
> [Scheduling Tasks - HTTP 203](https://www.youtube.com/watch?v=8eHInw9_U8k)
> https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
> https://nodejs.org/en/docs/guides/dont-block-the-event-loop/

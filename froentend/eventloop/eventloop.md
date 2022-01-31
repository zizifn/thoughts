# Node.js 是怎么解决多线程问题的？

在回答这个问题之前，让我们回顾下，为什么会有多线程这种东西？
## Multi-Tasking

### Once Upon A time, we only had a single process

### Cooperative muti-tasking

APP-->yeild-->OS-->APP2

如果有有些应用程序没有调用yeild，那么这个程序就会一直跑。Windows 95/98 就是这样工作的，经常一个程序就可以干掉一个系统。

虽然有问题，但是我们可以跑mutil-tasking的程序。
### Preemptive multitasking

此时，OS会把一个app 停掉，保持他们meemory，然后把另一个app 开始运行。OS 控制一切。

Window NT 引入了这个，我们熟悉的 XP 就是这样工作的。

虽然可以多任务，但是在 CPU Task 始终运行在一个CPU上。 那么怎么才能利用多CPU在一个task呢？

## Synmmetric multi Threading （SMT）

这是 CPU 级别的功能，OS 利用这种新的指令，可以做到利用多个 cpu 做到真正的多线程程序。

目前绝大部分系统的线程调度都是交个操作系统去调度的，这样操作系统才能利用SMT，做到一个Task在多个cpu上运行。

虽然线程的调度是由操作系统来完成的，但是数据的共享是由程序员来完成的。很难的。

既然很难写，那么Node.js 搞定的呢？ 答案就是，Node.js 是一个单线程的程序。 既然很难解决，那么我们就消灭问题。

## Node.js 是单线程的程序？

所有我们自己写的 javsacript，V8, event loop都跑在同一个线程里面，也就是 main thrad。

>

## Tasks

### Task

### Micro Task

### raf Task

## How loop work

> Reference
> [Jake Archibald: 在循环](https://www.youtube.com/c/JSConfEU)
> [The Node.js Event Loop: Not So Single Threaded](https://www.youtube.com/watch?v=zphcsoSJMvM)
> [Everything You Need to Know About Node.js Event Loop - Bert Belder, IBM](https://www.youtube.com/watch?v=PNa9OMajw9w)
> [Scheduling Tasks - HTTP 203](https://www.youtube.com/watch?v=8eHInw9_U8k)

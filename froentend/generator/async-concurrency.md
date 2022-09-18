# 如何限制 Promise 最大并发量

偶尔在 B 站刷到有人分享这个面试题。于是就自己作答以下。

## p-limit package

最佳方案当然是使用，battle tested 的 package。https://github.com/sindresorhus/p-limit#readme 

> 这工作中，谁要是自己写，当然是拖出去打死。

``` js
import pLimit from 'p-limit';

const limit = pLimit(2);

const input = [
	limit(() => createTask(1, 400)()),
	limit(() => createTask(2, 1000)()),
	limit(() => createTask(3, 1000)()),
    limit(() => createTask(4, 400)()),
    limit(() => createTask(5, 1000)())
];

// Only one promise is run at once
const result = await Promise.all(input);
console.log(result);

function createTask(num, ms) {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`promise ${num}`, Date.now());
                resolve(num);
            }, ms)
        })
    }
}

```

### 递归

其实 pLimit 实现也不复杂，为了实现简单，我下面实现就不考虑接口的设计。

这个问题的难点是，怎么知道并发 pool 里面的一个 promise 执行完成,并且在完成后移除，并加入一个新的 promise。 

这里我们可以使用递归。

``` js
async function pLimitPool(max, tasks) {
    const pending = tasks.splice(0, max).map(task => task());

    function drainPromise(){
        while(pending.length) {
            const p = pending.shift();
            p.then(
               (value)=>{
                if(tasks.length){
                    pending.push(...tasks.splice(0, 1).map(task => task()));
                    drainPromise()
                }
               }
            )
        }
    }
    drainPromise();
}

const task1 = createTask(1, 400);
const task2 = createTask(2, 1000);
const task3 = createTask(3, 1000);
const task4 = createTask(4, 400);
const task5 = createTask(5, 1000);
const task6 = createTask(6, 1000);
const task7 = createTask(7, 1000);
const task8 = createTask(8, 500);

const tasks = [task1, task2, task3, task4, task5, task6, task7, task8];


pLimitPool(2, tasks);
function createTask(num, ms) {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`promise ${num}`, Date.now());
                resolve(num);
            }, ms)
        })
    }
}
```


## Promise Race

如果你不喜欢递归，可以利用 [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

```
**Promise.race(iterable) **方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。
```
> 需要注意的是， race 方法返回的是一个新的 promise， 需要使用 then 保存 原始的 promise。

实现代码，
``` js
async function pLimitPool(max, tasks) {
    const result=[];
    const pending = tasks.splice(0, max).map(task => task());
    for (; pending.length;) {
        // 因为 race 返回的是一个新的 promise， 所以在这里保存下 reference， 好用来从 pending 中移除。
        // 这里还需要处理 reject case TODO：
        const {originPromise, value} = await Promise.race(pending.map(task => task.then(
            value => ({
            originPromise: task,
            value
        }))));
        result.push(value);
        pending.splice(pending.indexOf(originPromise), 1);
        if(tasks.length){
            pending.push(...tasks.splice(0, max- pending.length).map(task => task()));
        }
    }

    return result;
}

const task1 = createTask(1, 400);
const task2 = createTask(2, 1000);
const task3 = createTask(3, 1000);
const task4 = createTask(4, 400);
const task5 = createTask(5, 1000);
const task6 = createTask(6, 1000);
const task7 = createTask(7, 1000);
const task8 = createTask(8, 500);

const tasks = [task1, task2, task3, task4, task5, task6, task7, task8];

const result = await pLimitPool(2, tasks);

console.log(result);

function createTask(num, ms) { // 如上}
```

## Async generate + Promise Race

仅仅是用 race 是完全可以工作的，但是可读性和灵活性上不是很好，利用 Async generate 可以是代码变得更加灵活。

``` js
async function* pLimitPool(max, tasks) {
    const pending = tasks.splice(0, max).map(task => task());
    for (; pending.length;) {
        // 因为 race 返回的是一个新的 promise， 所以在这里保存下 reference， 好用来从 pending 中移除。
        // 这里还需要处理 reject case TODO：
        const {originPromise, value} = await Promise.race(pending.map(task => task.then(
            value => ({
            originPromise: task,
            value
        }))));
        yield originPromise;
        pending.splice(pending.indexOf(originPromise), 1);
        if(tasks.length){
            pending.push(...tasks.splice(0, max- pending.length).map(task => task()));
        }
    }
}

const task1 = createTask(1, 400);
const task2 = createTask(2, 1000);
const task3 = createTask(3, 1000);
const task4 = createTask(4, 400);
const task5 = createTask(5, 1000);
const task6 = createTask(6, 1000);
const task7 = createTask(7, 1000);
const task8 = createTask(8, 500);

const tasks = [task1, task2, task3, task4, task5, task6, task7, task8];


for await (const result of pLimitPool(2, tasks)){
    console.log(result);
}
function createTask(num, ms) { // 如上}
```

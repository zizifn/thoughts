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
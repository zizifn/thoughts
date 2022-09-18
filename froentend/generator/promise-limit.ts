

type MyTask = () => Promise<number>;
function createTask(num: number, ms: number): MyTask {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`promise ${num}`, Date.now());
                resolve(num);
            }, ms)
        })
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

// const taskGen = emitTask(tasks)
// const pending = [taskGen.next().value, taskGen.next().value].filter(Boolean).map(task => (task as MyTask)());

limit(2);

async function limit(maxTask: number) {
    const pending = tasks.splice(0, maxTask).map(task => task());
    while(pending.length){
        const { originPromise, value } = await Promise.race(pending.map(
            (p) => p.then(value => ({
                originPromise: p,
                value
            })
            )));
        // 从 pending 中移除
        const index = pending.indexOf(originPromise);
        pending.splice(index, 1);

        // 因为有个 promise 已经完成，所以在从tasks 里面拿一个
        if(tasks.length){
            pending.push(...tasks.splice(0, maxTask - pending.length).map(task => task()));
        }
    }

}


// function* emitTask(tasks: MyTask[]) {
//     for (const task of tasks) {
//         yield task;
//     }
// }




// // 方案一
// async function* emitTask(maxTask: number, tasks: MyTask[]) {
//     // get
//     const pending = tasks.splice(0, maxTask).map(task => task());

//     while (tasks.length) {
//         // 因为 promise 返回的是一个新的 promise， 所以在这里保存下reference， 好用来从 pending 中移除。
//         const { originPromise, value } = await Promise.race(pending.map(
//             (p) => p.then(value => ({
//             originPromise: p,
//             value
//         })
//         )));
//         // 从 pending 中移除
//         const index = pending.indexOf(originPromise);
//         pending.splice(index, 1);

//         // 因为有个promise 已经完成，所以在从tasks 里面拿一个
//         pending.push(...tasks.splice(0, maxTask - pending.length).map(task => task()));
//         yield originPromise;
//     }

//     // TODO: 这个和上面的可以合并。

//     while (pending.length) {
//         const { originPromise } = await Promise.race(pending.map((p) => ({
//             originPromise: p
//         })));
//         pending.splice(pending.indexOf(originPromise), 1);
//         yield originPromise;
//     }
// }

// (async () => {
//     for await (let taskResult of emitTask(2, tasks)) {
//         console.log('promise result', taskResult);
//     }
// })()

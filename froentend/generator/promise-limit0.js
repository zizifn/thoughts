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
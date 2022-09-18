
import pLimit from 'p-limit';
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
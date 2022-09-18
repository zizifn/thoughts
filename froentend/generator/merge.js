

const getSW = (endpoint) => {

    return async function* () {

        let nextUrl = `https://swapi.dev/api/${endpoint}`;

        while (nextUrl) {
            const resp = await fetch(nextUrl)
            const data = await resp.json();
            nextUrl = data.next;
            yield* data.results;
        }
    }
}

const swObj = {
    people: {
        [Symbol.asyncIterator]: getSW('people')
    },
    starships: {
        [Symbol.asyncIterator]: getSW('starships')
    }
}

/**
 *
 * @param {AsyncGenerator} asyncIterator1
 * @param {AsyncGenerator} asyncIterator2
 */
async function* merge(asyncIterator1, asyncIterator2){

    const results = [];
    while(true){
        const value1 = asyncIterator1.next();
        const value2 = asyncIterator2.next();

        // if(done1 && done2){
        //     return;
        // }
        let data1 = null;
        let data2 = null
        if(value1){
            data1 = await value1
        }
        if(value2){
            data2 = await value2
        }
        if(data2.done && data1.done){
            return;
        }
        if(data1?.done === false){
            yield data1?.value;
        }
        if(data2?.done === false){
            yield data2?.value;
        }
    }

}

for await(const item of merge(swObj.people[Symbol.asyncIterator](), swObj.starships[Symbol.asyncIterator]())){
    console.log(item?.name);
}

// for await(const item of swObj.people){
//     console.log("--people---", item.name);
// }

// for await(const item of swObj.starships){
//     console.log("--planets---", item.name);
// }

async function* test(){

    yield 1;
    yield 2;
}

for await(const item of test()){
    console.log(item);
}
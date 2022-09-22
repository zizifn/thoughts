async function* test(){
    // yield Promise.reject("error");
    yield 3
}


for await (let result of test()){
    console.log(result);
}
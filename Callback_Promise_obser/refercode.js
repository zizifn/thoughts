

// doc https://developers.google.com/web/fundamentals/primers/promises#_8

//Promise(executor: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void)
// var testPromise = new Promise(
//     (reslove, reject) => {
//         reslove("reslove success!");
//     }
// );

// testPromise.then(
//     (value) => {
//         console.log(value);
//         return value;
//     }
// );


// call back xml http request
//Promise(executor: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void)
function get(url) {
    return new Promise(
        (reslove, reject) => {
            try {
                var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                var req = new XMLHttpRequest();
                req.open('GET', url);
                req.onload = function () {
                    console.log("inside onload");
                    if (req.status == 200) {
                        console.log("return 200 on url ", url);
                        // console.log(req.responseText);
                        reslove(req.responseText);
                    }
                    else {
                        console.log("error", req.status);
                        reject(Error(req.status));
                    }
                };
                // req.onreadystatechange = (value)=>{
                //     console.log("onreadystatechange" + value);
                // }

                // Handle network errors
                req.onerror = function (error) {
                    console.log("req is ", req);
                    reject(Error("Network Error"));
                };

                req.send();
            } catch (error) {
                console.log("error is ", error);
                reject(error);

            }

            // // Handle network errors
            // req.onerror = function (error) {

            //     console.log("error is ", error);
            //     reject(Error("Network Error"));
            // };


        }
    );
}

// same error function return Error object, same as construct
// console.log(Error("test error"));
// console.log(new Error("test error"));
// get("http://zizi.press").then(
//     (value) => {
//         console.log("Success", value);
//     }
// ).catch(
//     (error) => {
//         console.log("error", error);
//     }
// );


// 对比， 顺序和异步
var i = 1;
console.log("i is ", i);
var j = i + 2;
console.log("j is ", j);

//promise

// var promise = new Promise(
//     (resolve, reject) =>{
//         resolve(1);
//     }
// );

var promise = Promise.resolve(1);

promise.then(
    (value) => {
        console.log("value is ", value);
        return value + 2;
    }
).then(
    (value) => {
        console.log("value is ", value);
    }
);

//https://raw.githubusercontent.com/zizifn/thoughts/master/data/primers/story.json

// get("https://raw.githubusercontent.com/zizifn/thoughts/master/data/primers/story.json").then(
//     (response) =>{
//         console.log("response is ", response);
//         return JSON.parse(response);
//     }
// ).then(
//     (jsonResponse) =>{
//         console.log("Json response is ", jsonResponse);
//     }
// );

function getJson(url) {
    return get(url).then(JSON.parse);
};

// // getChapter method
// getJson("https://raw.githubusercontent.com/zizifn/thoughts/master/data/primers/story.json").then(
//     (Response) => {
//         console.log("story is ", Response)

//         // 如果返回一个值，则会以该值调用下一个 then()。但是，如果您返回类似于 promise 的内容，下一个 then() 则会等待，
//         // 并仅在 promise 产生结果（成功/失败）时调用。
//         return getJson("https://raw.githubusercontent.com/zizifn/thoughts/master/data/primers/" + Response.chapterUrls[0]);
//     }
// ).then(
//     (chapterJson) =>{
//         console.log("chapter json is ", chapterJson);
//     }
// );

// 对比以上code 与 callback

// 下面才是展示真正的实力的时候

var storyPromise;

function getChapter(i){
    storyPromise = storyPromise || getJson('https://raw.githubusercontent.com/zizifn/thoughts/master/data/primers/story.json');

    return storyPromise.then(
        (storyResp) =>{
            return getJson("https://raw.githubusercontent.com/zizifn/thoughts/master/data/primers/" + storyResp.chapterUrls[i]);
        }
    )
};

getChapter(0).then(
    chapterJson =>{
        console.log("chapter json is ", chapterJson);
    }
);

//storyPromise will hold(resolved), next time, it's just return
getChapter(1).then(
    chapterJson =>{
        console.log("chapter2 json is ", chapterJson);
    }
);

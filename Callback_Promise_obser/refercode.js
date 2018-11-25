

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

                console.log("GET");
                req.open('GET', url);

                req.onload = function () {
                    console.log("inside onload");
                    if (req.status == 200) {
                        console.log("return 200");
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
                    console.log("error is ", error);
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
get("http://zizi.press").then(
    (value) => {
        console.log("Success", value);
    }
).catch(
    (error) => {
        console.log("error", error);
    }
);


// 对比， 顺序和异步
var i = 1;
console.log("i is ", i);
var j = i+2;
console.log("j is ", j);

//promise

// var promise = new Promise(
//     (resolve, reject) =>{
//         resolve(1);
//     }
// );

var promise = Promise.resolve(1);

promise.then(
    (value)=>{
        console.log("value is ", value);
        return value+2;
    }
).then(
    (value)=>{
        console.log("value is ", value);
    }
)


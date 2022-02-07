import https from 'https';

//原理代码， 可以把下面代码抽象到一个module 中，然后实现无痛注入
const orginRequest = https.request;
https.request = function () {
    console.log('interceptor');
    // 这里可以做的事情很多，
    // 1. 修改 http header
    // 2. 修改 request callback
    return Reflect.apply(orginRequest, this, arguments)
}

const options = {
    hostname: 'www.baidu.com',
    port: 443,
    path: "/img/PC_7ac6a6d319ba4ae29b38e5e4280e9122.png",
    method: 'GET'
}
const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
})
req.end();

import https from 'https';
const orginRequest = https.request;
https.request = function () {
    console.log('test1111');
    return Reflect.apply(orginRequest, this, arguments)
}
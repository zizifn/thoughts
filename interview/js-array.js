let arry = {
    length: 2,
    'test1': '1',
    '1': '2'
}

Object.setPrototypeOf(arry, Array.prototype)

let arry2 = ['te', 'te1']

for (const iterator of arry) {
    console.log(iterator);
}
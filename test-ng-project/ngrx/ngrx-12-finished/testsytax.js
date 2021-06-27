let test = {
    key1: '123',
    key2: '345',
    key3: {
        key31: 'rty'
    }
}

console.log(
    {
        ...test,
        key3: null
    }
)
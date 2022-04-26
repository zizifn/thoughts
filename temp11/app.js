const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {

    // get all env
    // normal env
    const testvar = process.env.testvar;
    let text = `env-testvar is ${testvar}\n`;
    res.write(text)

    const testfile = process.env.testfile;
    text = `env-testfile is ${testfile} \n`;
    res.write(text)

    const testjson = process.env.testjson;
    text = `env-testfile is ${testjson}\n`;
    res.write(text)

    res.end('end')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
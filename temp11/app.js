
import './utils/tracing.js'
import 'express-async-errors'
import express from 'express';
import { join, resolve } from 'path';
import fetch from 'node-fetch'
const app = express()
const port = 3000

app.use('/static', express.static(join(resolve(), 'public')))

app.get('/api/wiki', async (req, res) => {
   const resp = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Hazard_Powder_Company")
   res.json(await resp.json())
})

app.get('/*', (req, res) => {

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

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


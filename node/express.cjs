/**
 * myLogger
 */
const express = require("express");
const app = express();

const myLogger = function (req, res, next) {
    console.log("LOGGED");
    res.json({});
    next();
};

app.use(myLogger);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000);
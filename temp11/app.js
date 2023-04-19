import "./utils/tracing.js";
import "express-async-errors";
import express from "express";
import { join, resolve } from "path";
import fetch from "node-fetch";
import morgan from "morgan";
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from "ws";
const app = express();
const port = 3000;
const httpServer = createServer(app);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);


app.use("/gtw/hello/static", express.static(join(resolve(), "public")));

app.get("/gtw/hello/api/wiki", async (req, res) => {
  const resp = await fetch(
    "https://en.wikipedia.org/api/rest_v1/page/random/summary"
  );
  res.json(await resp.json());
});

app.get("/gtw/hello", (req, res) => {
  console.log("----------------index------------");
  // get all env
  // normal env
  const testvar = process.env.testvar;
  let text = `env-testvar is ${testvar}\n`;
  res.write(text);

  const testfile = process.env.testfile;
  text = `env-testfile is ${testfile} \n`;
  res.write(text);

  const testjson = process.env.testjson;
  text = `env-testfile is ${testjson}\n`;
  res.write(text);

  res.end("end");
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const wss1 = new WebSocketServer({ server: httpServer, path: "/gtw/hello/ws" });
wss1.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.addEventListener("message", (message) => {
    ws.send(message.data);
  });
});

wss1.on("error", (error) => {
  console.log(error);
});

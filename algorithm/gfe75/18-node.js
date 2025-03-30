import { EventEmitter } from "events";

const emitter = new EventEmitter();

function mytest() {
  console.log("mytest");
}

emitter.on("test", mytest);
console.log("1")
emitter.on("test", mytest);
emitter.emit("test")

console.log('end')

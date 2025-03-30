interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter;
  off(eventName: string, listener: Function): IEventEmitter;
  emit(eventName: string, ...args: Array<any>): boolean;
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
export default class EventEmitter implements IEventEmitter {
  private observer = new Map<string, Function[]>();
  constructor() {
    // throw "Not implemented!";
  }

  on(eventName: string, listener: Function): IEventEmitter {
    // throw "Not implemented!";

    if (!this.observer.has(eventName)) {
      this.observer.set(eventName, [listener]);
    } else {
      this.observer.get(eventName).push(listener);
    }
    return this;
  }

  off(eventName: string, listener: Function): IEventEmitter {
    if (!this.observer.has(eventName)) {
      return this;
    }

    const observer = this.observer.get(eventName);
    const index = observer.findIndex((obs) => obs === listener);
    if (index != -1) {
      observer.splice(index, 1);
    }
    return this;
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    // throw "Not implemented!";
    const obs = this.observer.get(eventName);
    if (!obs?.length) {
      return false;
    }

    this.observer.get(eventName).forEach((obs) => {
      obs(...args);
    });

    return true;
  }
}

const emitter = new EventEmitter();

let sum = 0;
function addTwoNumbers(a: number, b: number) {
  sum = a + b;
}
emitter.on("foo", addTwoNumbers);
console.log(emitter.emit("foo", 2, 5));
// expect(sum).toBe(7);

emitter.off("foo", addTwoNumbers);
console.log(emitter.emit("foo", -3, 9));
// expect(sum).toBe(7);

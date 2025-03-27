function debounce(func: Function, wait: number): Function {
  let id: number;
  console.log("debounce", this);
  return function (...args: any[]) {
    console.log("debounce inside", this);

    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

function hello() {
  console.log(this);
  console.log("hello--", this?.name);
}

// hello();
const test = {
  name: "james",
  sayHello() {
    console.log(this.name);
  },
  sayHello2: hello,
  sayHello3: debounce(hello, 100),
};

// test.sayHello();
// test.sayHello2();
test.sayHello3();

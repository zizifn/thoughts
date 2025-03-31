const testObj = {
  name: "james",
  myfun: () => {
    console.log("myfun", this);
  },
};

console.log(testObj);

function testFun() {
  console.log(this);
  (() => {
    console.log("inside func", this);
  })();
}

testFun();
testFun.apply({ xxx: 1 });

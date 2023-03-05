let state = {
  count: 0,
};

let preState = {};

const button1 = document.createElement("button");

button1.textContent = "0";

// way 2
// pure pull base render
setInterval(() => {
  // 这里可以没有 pre state， 可以先读取 dom 的值，
  // 但是读取 dom 不可控，会引起 performance 问题。
  if (preState.count !== state.count) {
    button1.textContent = state.count;
  }
  preState = { ...state };
}, 100);
button1.addEventListener("click", () => {
  state.count++;
});

// way 1
// button1.addEventListener("click", ()=>{

//     button1.textContent = +button1.textContent +1;
// })

document.body.appendChild(button1);

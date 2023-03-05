let state = {
  count: 0,
};

let preState = {};

const button1 = document.createElement("button");

button1.textContent = "0";

// 这里不算 pull，或许是push，
// 据说 servlet 是通过 编译器 注入 update 方法到事件中。
function update() {
  if (preState.count !== state.count) {
    button1.textContent = state.count;
  }
  preState = { ...state };
}

button1.addEventListener("click", () => {
  state.count++;
  update();
});

document.body.appendChild(button1);

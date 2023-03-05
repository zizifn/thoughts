// basic react version

const state = new Proxy(
  {
    count: 0,
  },
  {
    set(target, p, newValue) {
      target[p] = newValue;
      button1.textContent = newValue;
    },
  }
);
const button1 = document.createElement("button");
button1.textContent = "0";

button1.addEventListener("click", () => {
  state.count++;
});

document.body.appendChild(button1);

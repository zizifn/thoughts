let state = {
  count: 0,
};

let preState = {};

const button1 = document.createElement("button");
button1.textContent = "0";

// react like
function setState(state) {
  if (preState.count !== state.count) {
    button1.textContent = state.count;
  }
  const clickEvent = () => {
    setState({
      count: state.count + 1,
    });
    button1.removeEventListener("click", clickEvent);
  };
  button1.addEventListener("click", clickEvent);
  preState = { ...state };
}

setState({
  count: 0,
});

document.body.appendChild(button1);

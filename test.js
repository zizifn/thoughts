document.getElementById("button1").addEventListener("click", click1, {
})


function click1(event) {
    console.log(event.offsetX);
    console.log(event.clientX);
    console.log(event.pageX);
    console.log(event.screenX);
    console.log(this);
    click2.call(this);
}

function click2() {
    console.log("click2");
    console.log(this);
}

document.getElementById("parentDiv").addEventListener(
    "click", (event) => {
        console.log("click parentDiv");
        event.stopPropagation()
    }
    , false
)
const timerContent = document.getElementById("timer");
function updateUI(number) {
    timerContent.textContent = number;
}


function interval(ms, callback) {
    const start = document.timeline ? document.timeline.currentTime : performance.now();
    function timer1(time) {
        const gaps = time - start;
        const seconds = Math.round(gaps / ms);
        callback(seconds);
        console.log(seconds);
        const targetNext = (seconds + 1) * ms + start; //
        const delay = document.timeline ? document.timeline.currentTime : performance.now()
        setTimeout(
            () => {
                requestAnimationFrame(timer1)
                // timer1(document.timeline.currentTime)
            },
            targetNext - delay
        )
    }
    timer1(start);
}

interval(1000, updateUI)

// const start = document.timeline ? document.timeline.currentTime : performance.now();

// function timer1(time) {
//     const gaps = time - start;
//     const seconds = Math.round(gaps / 1000);
//     updateUI(seconds);
//     console.log(seconds);
//     setTimeout(
//         () => {
//             // requestAnimationFrame(timer1)
//             timer1(document.timeline.currentTime)
//         },
//         1000 - gaps % 1000
//     )
// }
// timer1()

// let start = Date.now();
// function timer1() {
//     let gaps = (Date.now() - start);
//     let seconds = Math.floor(gaps / 1000);
//     // console.log(document.timeline.currentTime);
//     updateUI(seconds)
//     requestAnimationFrame(timer1)
// }
// timer1()


// function timer1() {
//     let seconds = 1;

//     setInterval(() => {
//         updateUI(seconds++)
//     }, 1000);
// }
// timer1();

// function timer1() {
//     let start = Date.now();
//     setInterval(() => {
//         let gaps = (Date.now() - start);
//         let seconds = Math.floor(gaps / 1000);
//         updateUI(seconds)
//     }, 1000);
// }

// timer1()


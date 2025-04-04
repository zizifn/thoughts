import React, { type MouseEvent } from "https://esm.sh/react@18.2.0";
import confetti from "https://esm.sh/canvas-confetti@1.6.0";

const App = () => {
  function onMouseMove(e: MouseEvent) {
    confetti({
      particleCount: 5,
      origin: {
        x: e.pageX / window.innerWidth,
        y: (e.pageY + 20) / window.innerHeight,
      },
    });
  }

  return (
    <div onMouseMove={onMouseMove}>
      <h1>Hello React! ⚛️</h1>
      <p>Building user interfaces.</p>
    </div>
  );
};

export default App;

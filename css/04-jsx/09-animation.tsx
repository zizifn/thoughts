import { Map, Save, ShoppingCart } from "react-feather";

import React from "react";
import { createGlobalStyle } from "styled-components";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
html, body{
  height: 100%;
}
@keyframes jump {
  0% {
    transform: translateY(0%);
  }
  30% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(0%);
  }
}

body {
  margin: 0;
  padding: 0;
}
`;
function App() {
  const [animated, setAnimated] = React.useState(false);

  return (
    <Wrapper>
      <Box
        style={{
          animationPlayState: animated ? "running" : "paused",
        }}
      />
      <button
        onClick={() => {
          setAnimated(!animated);
        }}
      >
        {animated ? "Disable animation" : "Enable animation"}
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  height: 100vh;
`;

const Box = styled.div`
  width: 80px;
  height: 80px;
  background: slateblue;
  animation: jump 1000ms infinite;
`;
const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <App></App>
    <GlobalStyles></GlobalStyles>
  </>
);

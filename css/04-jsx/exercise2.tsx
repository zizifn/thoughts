import React from "react";
import { createGlobalStyle } from "styled-components";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
html, body{
  height: 100%;
}
  body {
  background: pink;
}


`;

const WallArtWrapper = styled.div`
  margin: auto;
  width: 250px;
  padding: 8px;
  position: relative;
  isolation: isolate;
  background: white;
  box-shadow: 0 2.7px 1.9px -2px rgba(0, 0, 0, 0.028),
    0 6.4px 6.1px -2px rgba(0, 0, 0, 0.046),
    0 12px 13.2px -2px rgba(0, 0, 0, 0.061),
    0 21.4px 24.5px -2px rgba(0, 0, 0, 0.073),
    0 -15px 40px -20px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const WallArtImg = styled.img`
  display: block;
  border-radius: 4px;
`;

const WallArtCaption = styled.p`
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  text-align: center;
  padding: 8px;
  background: hsl(0deg 0% 100% / 0.9);
  backdrop-filter: blur(10px);
`;

function WallArt({ src, alt, caption, width }) {
  const aspectRatio = 3 / 2;
  const height = width * aspectRatio;

  return (
    <WallArtWrapper>
      <WallArtImg
        src={src}
        alt={alt}
        style={{
          width,
          height,
        }}
      />
      <WallArtCaption>{caption}</WallArtCaption>
    </WallArtWrapper>
  );
}

const App = () => {
  const test: string = "test";

  return (
    <>
      <WallArt
        src="/css/img/style.jpg"
        alt="A hallway with rainbow-coloured lights"
        caption="Photo by Efe Kurnaz"
        width={250}
      />

      <GlobalStyles></GlobalStyles>
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

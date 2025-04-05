import { Map, Save, ShoppingCart } from "react-feather";

import React from "react";
import { createGlobalStyle } from "styled-components";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
html, body{
  height: 100%;
}
  /* body {
  background: pink;
} */


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
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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
      <WallArtImg src={src} alt={alt} width={width} height={height} />
      <WallArtCaption>{caption}</WallArtCaption>
    </WallArtWrapper>
  );
}

const BtnWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const IconBtn = styled.button`
  background: white;
  border-radius: 8px;
  border: 2px solid hsl(0deg 0% 80%);
  width: 90px;
  height: 90px;
`;

const IconBtnContent = styled.span`
  display: block;
  color: ${(props) => (props.isCurrent ? "deeppink" : false)};
`;

function IconButton({ icon, children, isCurrent, ...delegated }) {
  return (
    <IconBtn {...delegated}>
      <IconBtnContent isCurrent={isCurrent}>{icon}</IconBtnContent>
      {children}
    </IconBtn>
  );
}

function ButtonGroup() {
  return (
    <BtnWrapper>
      <IconButton isCurrent icon={<Map />}>
        Navigation
      </IconButton>
      <IconButton icon={<Save />}>Save Route</IconButton>
      <IconButton icon={<ShoppingCart />}>View Cart</IconButton>
    </BtnWrapper>
  );
}

const App = () => {
  const test: string = "test";

  return (
    <>
      {/* <WallArt
        src="/css/img/style.jpg"
        alt="A hallway with rainbow-coloured lights"
        caption="Photo by Efe Kurnaz"
        width={250}
      /> */}
      <ButtonGroup />
      <GlobalStyles></GlobalStyles>
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

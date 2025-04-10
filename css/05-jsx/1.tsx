import { Check } from "react-feather";
import React from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

function Alert({ children }) {
  return (
    <Wrapper>
      <IconWrapper>
        <Check />
      </IconWrapper>
      <Heading>{children}</Heading>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 20px hsl(0deg 0% 0% / 0.35);
  border-radius: 4px;
  padding: 8px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  align-self: self-start;
  background: forestgreen;
  color: white;
  border-radius: 50%;
  margin-right: 8px;
`;

const Heading = styled.div`
  flex-grow: 1;
`;
const App = () => {
  const test: string = "test";

  return "TESTITT - LIHHB BY LIGHT";
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

import React from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

const Quote = ({ by, source, children }) => {
  return (
    <figure>
      <QuoteContent>{children}</QuoteContent>
      <figcaption>
        <Author>
          <SourceLink href={source}>{by}</SourceLink>
        </Author>
      </figcaption>
    </figure>
  );
};

const QuoteContent = styled.blockquote`
  margin: 0;
  background: hsl(0deg 0% 90%);
  padding: 16px 20px;
  border-radius: 8px;
  font-style: italic;

  &::before {
    content: "“";
  }

  &::after {
    content: "”";
  }
`;

const Author = styled.cite`
  display: block;
  text-align: right;
  margin-top: 8px;
`;

const SourceLink = styled.a`
  text-decoration: none;
  color: hsl(0deg 0% 35%);

  &::before {
    content: "—";
  }
`;
const App = () => {
  const test: string = "test";

  return (
    <Quote
      by="Bill Gates (Allegedly)"
      source="https://quoteinvestigator.com/2011/09/08/640k-enough/"
    >
      640kb of memory ought to be enough for anyone
    </Quote>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

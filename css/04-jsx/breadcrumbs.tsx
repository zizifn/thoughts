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
const BreadcrumbsWrapper = styled.ol`
  list-style: none;
  font-weight: 700;
  padding: 0;
  margin: 0;
`;
const BreadcrumbsItem = styled.li`
  display: inline;
  color: transparent;
  &:not(:first-of-type) {
    margin-left: 10px;
    &:before {
      content: "/";
    }
  }
`;
const BreadcrumbsSpilter = styled.span`
  margin-inline: 5px;
`;
const Breadcrumbs = ({ children }) => {
  console.log(children);
  return (
    <nav>
      <BreadcrumbsWrapper>{children}</BreadcrumbsWrapper>
    </nav>
  );
};

const CrumbLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: revert;
  }
`;
const Crumb = ({ children, href }) => {
  return (
    <BreadcrumbsItem>
      <CrumbLink href={href}>{children}</CrumbLink>
    </BreadcrumbsItem>
  );
};

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

/*
  We want this TextLink to be black
  and underlined when it's inside
  a Quote component.
*/

const TextLink = styled.a`
  color: blue;
  text-decoration: none;
`;

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

  ${TextLink} {
    color: red;
  }
`;

/* You can safely ignore everything below this point! It doesn't need to change */
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
    <>
      <div
        style={{
          width: "100px",
          height: "20px",
        }}
        dangerouslySetInnerHTML={{
          __html: "First &middot; Second",
        }}
      />
      {/* <Breadcrumbs>
        <Crumb href="/">Home</Crumb>
        <Crumb href="/living">Living Room</Crumb>
        <Crumb href="/living/couch">Couches</Crumb>
        <Crumb href="/living/couch/sectional">Sectionals</Crumb>
      </Breadcrumbs>
      <GlobalStyles></GlobalStyles> */}

      <Quote by="Unknown" source="/">
        This quote <TextLink href="/">contains a link</TextLink>!
      </Quote>
      <p>
        This paragraph <TextLink href="/">contains a link</TextLink>!
      </p>
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

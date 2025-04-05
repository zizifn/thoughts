import React from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

const Summary = styled.summary`
  cursor: pointer;
  padding: 12px 16px;
  outline-offset: 5px;
`;

const Detils = styled.details`
  font-size: 1rem;
  color: hsl(0deg 0% 25%);
  margin: 32px;
  border: 2px solid;
  border-radius: 4px;
`;

const AnswerDiv = styled.div`
  background: hsl(0deg 0% 92.5%);
  border-radius: 0 0 4px 4px;
  padding: 12px 17px;
  font-style: italic;
`;

function FrequentlyAskedQuestion({ question, answer }) {
  return (
    <Detils>
      <Summary>{question}</Summary>
      <AnswerDiv>{answer}</AnswerDiv>
    </Detils>
  );
}

const FormWrapper = styled.form`
  width: max-content;
  margin: 16px auto;
  border: 1px dotted silver;
  padding: 26px 32px 32px;
  border-radius: 2px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 16px;
`;

const FormInput = styled.input`
  display: block;
  width: 175px;
  border: 1px solid black;
  border-bottom-width: 2px;
  padding: 6px 8px;
  margin-top: 4px;
  &:focus {
    outline: 3px auto blue;
    outline-offset: 2px;
    border-color: transparent;
  }
`;

const FormBtn = styled.button`
  display: block;
  margin-top: 40px;
  width: 100%;
  background: black;
  color: white;
  padding: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 3px;

  &:focus {
    outline: 3px auto blue;
    background: blue;
    outline-offset: 2px;
  }
`;

function LoginForm({ handleSubmit }) {
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormLabel>
        Email:
        <FormInput type="email" placeholder="me@you.com" />
      </FormLabel>
      <FormLabel>
        Password:
        <FormInput type="password" />
      </FormLabel>
      <FormBtn type="submit">Log In</FormBtn>
    </FormWrapper>
  );
}

const ArticleWrapper = styled.article`
  min-width: 250px;
  border-radius: 32px;
  padding: 24px;
  background: white;
  box-shadow: 0px 2px 20px hsl(248deg 53% 40%);
  text-align: center;
`;

const Name = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0px;
`;

const Email = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: hsl(0deg 0% 40%);
`;

const Avater = styled.image`
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -64px;
  margin-bottom: 16px;
  border: 6px solid white;
`;
function ContactCard({ avatarSrc, name, email }) {
  return (
    <ArticleWrapper>
      <Avater alt="" src={avatarSrc} />
      <Name>{name}</Name>
      <Email>{email}</Email>
    </ArticleWrapper>
  );
}
const App = () => {
  const test: string = "test";

  return (
    <>
      <FrequentlyAskedQuestion
        question="What does “CSS” stand for?"
        answer="Cool Styling Strategy"
      />
      <LoginForm
        handleSubmit={(ev) => {
          ev.preventDefault();
          alert("Submitted!");
        }}
      />
      <ContactCard
        avatarSrc="/course-materials/cat-300px.jpg"
        name="Mittens"
        email="meow@gmail.com"
      />
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

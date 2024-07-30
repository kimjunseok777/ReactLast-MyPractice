import styled from "styled-components";
import SignInForm from "./_components/sign-in-form";
import SignUpForm from "./_components/SignUpForm";
import { useState } from "react";

const Main = () => {
  const [formState, setFormState] = useState("SIGN-IN");

  const TAB_ARRAY = [
    {
      name: "SIGN-IN",
    },
    {
      name: "SIGN-UP",
    },
  ];

  const handlePressSignTab = (tabName) => {
    setFormState(tabName);
  };

  return (
    <S.Wrapper>
      <S.Container className={formState === "SIGN-IN" ? "" : ""}>
        <S.Header>
          {TAB_ARRAY.map((tab, index) => (
            <S.Tab
              key={index}
              $isSelected={formState === tab.name}
              onClick={() => handlePressSignTab(tab.name)}
            >
              {tab.name}
            </S.Tab>
          ))}
        </S.Header>
        {formState === "SIGN-IN" ? (
          <SignInForm />
        ) : (
          <SignUpForm setFormState={setFormState} />
        )}
      </S.Container>
    </S.Wrapper>
  );
};
export default Main;

const Wrapper = styled.div`
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 360px;
  border: 1px solid #999;
`;

const Header = styled.header`
  background-color: #00c7ae;
  display: flex;
`;

const Tab = styled.div`
  width: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.$isSelected && "background-color: #e0e0e0;"}

  font-size: 32px;
  padding: 16px;
  font-weight: bold;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const S = {
  Wrapper,
  Container,
  Header,
  Tab,
};

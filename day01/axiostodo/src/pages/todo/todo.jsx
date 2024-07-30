import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../libs/styles/common";
import TDButton from "../../components/Button";
import AddTodoModal from "./_components/addTodoModal";
import TodoList from "./_components/todoList";
import { useState } from "react";

const Todo = () => {
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);

  return (
    <>
      {isOpenAddTodoModal && (
        <AddTodoModal setIsOpenAddTodoModal={setIsOpenAddTodoModal} />
      )}
      <S.Wrapper>
        <S.Container>
          <S.Title>TODOLIST</S.Title>
          <TodoList />
          <TDButton
            size={"full"}
            variant={"primary"}
            onClick={() => setIsOpenAddTodoModal(true)}
          >
            추가
          </TDButton>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
export default Todo;

const Wrapper = styled.div`
  height: 100vh;
  ${flexCenter};
`;

const Container = styled.div`
  width: 420px;
  height: 100%;
  background-color: "#ffffff";
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  background-color: ${(props) => props.theme.colors.primary};
  // themeProvider로 전달된 theme 객체는
  // 콜백함수의 theme이라는 key로 전달 theme.colors.primary

  color: ${({ theme }) => theme.colors.text.white};
  padding-left: 32px;
  height: 32px;
  ${flexAlignCenter};
`;

const S = {
  Wrapper,
  Container,
  Title,
};

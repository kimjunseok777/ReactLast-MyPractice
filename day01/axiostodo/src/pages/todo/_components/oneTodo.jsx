import styled from "styled-components";
import { flexAlignCenter } from "../../../libs/styles/common";
import { useRef, useState } from "react";
import { useTodo } from "providers/todo-provider";

const OneTodo = ({ todo }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const contentRef = useRef();
  const {deleteTodo, getTodo} = useTodo()

  //-------------------------------------------------------------------------
  // axios2 수업 :
  const onPressDeleteTodo = async() => {
    // const todoId = todo.id;
    // const response = await fetch(`/api/todo/${todoId}`, {
    //   method: 'delete'
    // })
    // const data = await response.json()
    // console.log(data)
    await deleteTodo({
      todoId: todo.id
    })
    await getTodo() //-->  마지막 코드라 await 걸어도 되고 안 걸어도 된다
  };
  //-------------------------------------------------------------------------

  const onPressChangeEditMode = () => {
    setIsEditMode(true);
  };

  const onPressEdit = async() => {
    const todoId = todo.id;
    const content = contentRef.current.value;

    const response = await fetch(`/api/todo?todoId=${todoId}`, {
      method: 'patch',
      body: JSON.stringify({
        content
      })
    })
    const data = await response.json()
    setIsEditMode(false);
  };

  return (
    <S.Wrapper state={todo.state.toString()}>
      <S.Header>
        <div>
          {todo.state ? "완료" : "미완료"}
          {todo.title}
        </div>
        <div>
          <button onClick={isEditMode ? onPressEdit : onPressChangeEditMode}>
            {isEditMode ? "완료" : "수정"}
          </button>
          <button onClick={onPressDeleteTodo}>삭제</button>
        </div>
      </S.Header>
      {isEditMode ? (
        <textarea ref={contentRef} defaultValue={todo.content}></textarea>
      ) : (
        <S.Content $state={todo.state.toString()}>{todo.content}</S.Content>
      )}
    </S.Wrapper>
  );
};
export default OneTodo;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid #999;
  margin: 16px 0;
  border-radius: 8px;
  background-color: ${({ $state, theme }) =>
    $state === "true" ? theme.colors.Gray[1] : theme.colors.white};
`;

const Header = styled.div`
  border-bottom: 1px dotted #999;
  ${flexAlignCenter};
  justify-content: space-between;
  padding: 8px 16px;
  height: 48px;
`;

const Content = styled.div`
  padding: 16px;
  text-decoration: ${({ $state }) =>
    $state === "true" ? "line-through" : "none"};
`;

const S = {
  Wrapper,
  Header,
  Content,
};

import styled from "styled-components";
import OneTodo from "./oneTodo";
import { useEffect, useState } from "react";
import { useTodo } from "providers/todo-provider";

const TodoList = () => {
  // const [todos, setTodos] = useState([])
  const {todos, getTodo} = useTodo()

  useEffect(() => {
    // async function fetchTodos() {
    //   const result = await fetch("/api/todo");
    //   const data = await result.json();
    // }
    // fetchTodos();
    getTodo()  //-->  다 지우고 이렇게 getTodo 만 실행시켜주면 끝이다
  }, []);

  return (
    <S.Wrapper>
      {todos.map((todo) => (
        <OneTodo key={todo.id} todo={todo} />
      ))}
    </S.Wrapper>
  );
};
export default TodoList;

const Wrapper = styled.div`
  padding: 32px 0;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const S = {
  Wrapper,
};

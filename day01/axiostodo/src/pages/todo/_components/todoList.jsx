import styled from "styled-components";
import OneTodo from "./oneTodo";

import { useEffect, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchTodos() {
      const result = await fetch("/api/todo");
      const data = await result.json();
    }
    fetchTodos();
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

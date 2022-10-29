import React from "react";
import styled from "styled-components";
import { useFetchTodos } from "../../atoms/todos";

const Todos = () => {
  const { todos, isLoading } = useFetchTodos();

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  return (
    <StList>
      {todos?.map((todo) => (
        <StCard key={todo.id}>
          <div>{todo.id}</div>
          <div>{todo.author}</div>
          <div>{todo.title}</div>
        </StCard>
      ))}
    </StList>
  );
};

export default Todos;

const StCard = styled.div`
  border: 1px solid #777;
  flex-basis: 100px;
  flex-grow: 1;
`;

const StList = styled.div`
  display: flex;
  gap: 12px;
`;

import React from "react";
import { useRouter } from "next/router";
import { useFetchTodo } from "../../atoms/todo";

const Todo = () => {
  const {
    push,
    query: { id },
  } = useRouter();
  const { isLoading, todo } = useFetchTodo(id?.toString());

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <h3>{todo.title}</h3>
      <h3>{todo.author}</h3>

      <div>
        <button
          onClick={() => {
            push(`/${id}/edit`);
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Todo;

import React from "react";
import { useRouter } from "next/router";
import { todoAtom, useFetchTodo } from "../../atoms/todo";
import { useAtomValue } from "jotai";

const Todo = () => {
  const {
    push,
    query: { id },
  } = useRouter();
  // const { isLoading } = useFetchTodo(id?.toString());
  const todo = useAtomValue(todoAtom);

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

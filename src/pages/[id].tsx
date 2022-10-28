import { useRouter } from "next/router";
import React from "react";
import { useFetchTodo } from "../atoms/todos";

const Home = () => {
  const {
    query: { id },
  } = useRouter();

  const { isLoading, todo } = useFetchTodo(id?.toString());

  if (isLoading) {
    return (
      <>
        로딩중<div className=""></div>
      </>
    );
  }

  console.log(todo);

  return (
    <div>
      <div>{todo.title}</div>
      <div>{todo.userId}</div>
      <div>{todo.id}</div>
    </div>
  );
};

export default Home;

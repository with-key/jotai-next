import React, { useState } from "react";
import { Provider } from "jotai";
import Form from "../form";
import { Button } from "../components/button";
import { useRouter } from "next/router";
import { useFetchTodo } from "../atoms/todo";

const Home = () => {
  const {
    query: { id },
  } = useRouter();

  const { isLoading, todo, isFetched } = useFetchTodo(id?.toString());
  const [isAddMode, setIsAddmode] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setIsAddmode((pre) => !pre);
        }}
      >
        {isAddMode ? "생성 모드" : "수정 모드"}
      </Button>
      {isAddMode ? (
        <Provider>
          <Form isAddMode={isAddMode} />
        </Provider>
      ) : (
        <Form isAddMode={isAddMode} />
      )}
    </>
  );
};

export default Home;

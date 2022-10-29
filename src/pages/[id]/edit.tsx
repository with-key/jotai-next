import React, { useState } from "react";
import Form from "../../features/form";
import { useFetchTodo } from "../../atoms/todo";
import { useRouter } from "next/router";

const Edit = () => {
  const {
    push,
    query: { id },
  } = useRouter();

  const { isLoading } = useFetchTodo(id?.toString());

  if (isLoading) {
    return <></>;
  }
  return (
    <>
      <Form isAddMode={false} />
    </>
  );
};

export default Edit;

import React from "react";
import { Button } from "../../components/button";
import { Flex } from "../../components/flex";
import TitleField from "../field/TitleField";
import AuthorField from "../field/AurthorField";
import { useUpdateAtom } from "jotai/utils";
import { addTodoAtom, useAddTodo } from "../../atoms/todo";

type Props = {
  isAddMode: boolean;
};

const Form = ({ isAddMode }: Props) => {
  const { mutate } = useAddTodo();
  const submit = useUpdateAtom(addTodoAtom);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Flex dir="col" gap={16}>
        <TitleField />
        <AuthorField />
        <Button
          onClick={() => {
            submit(mutate);
          }}
        >
          {isAddMode ? "추가" : "수정"}
        </Button>
      </Flex>
    </form>
  );
};

export default Form;

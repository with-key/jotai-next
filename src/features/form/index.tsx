import React from "react";
import { Button } from "../../components/button";
import { Flex } from "../../components/flex";
import TitleField from "../field/TitleField";
import AuthorField from "../field/AurthorField";
import { useAddTodo, useUpdateTodo } from "../../atoms/todo";
import { useRouter } from "next/router";

type Props = {
  isAddMode: boolean;
};

const Form = ({ isAddMode }: Props) => {
  const {
    query: { id },
  } = useRouter();

  const {
    submit: addSubmit,
    mutation: { mutate: addMutate, isLoading },
  } = useAddTodo();

  const {
    updateSubmit,
    mutation: { mutate: updateMutate },
  } = useUpdateTodo();

  if (isLoading) {
    return <div>로딩 중..</div>;
  }

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
            if (isAddMode) {
              return addSubmit(addMutate);
            } else {
              if (id) {
                return updateSubmit([updateMutate, id]);
              }
            }
          }}
        >
          {isAddMode ? "추가" : "수정"}
        </Button>
      </Flex>
    </form>
  );
};

export default Form;

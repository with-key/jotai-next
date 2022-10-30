import React from "react";
import { Button } from "../../components/button";
import { Flex } from "../../components/flex";
import TitleField from "../field/TitleField";
import AuthorField from "../field/AurthorField";
import { useAddTodo, useDeleteTodo, useUpdateTodo } from "../../atoms/todo";
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

  const {
    onDelete,
    mutation: { mutate },
  } = useDeleteTodo();

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
        <Flex gap={12}>
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
          <Button
            onClick={() => {
              if (id) {
                onDelete([mutate, id?.toString()]);
              }
            }}
          >
            삭제하기
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default Form;

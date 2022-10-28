import React from "react";
import { Button } from "../components/button";
import { Flex } from "../components/flex";
import TitleField from "../features/field/TitleField";
import AuthorField from "../features/field/AurthorField";
import { useRouter } from "next/router";
import { submitAtom } from "../atoms/todo";
import { useUpdateAtom } from "jotai/utils";

type Props = {
  isAddMode: boolean;
};

const Form = ({ isAddMode }: Props) => {
  const setter = useUpdateAtom(submitAtom);
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
            setter();
          }}
        >
          {isAddMode ? "추가" : "수정"}
        </Button>
      </Flex>
    </form>
  );
};

export default Form;

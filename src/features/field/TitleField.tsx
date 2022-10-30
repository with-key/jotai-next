import React from "react";
import { titleAtom } from "../../atoms/todo";
import { Input } from "../../components/input/input";
import { useInputString } from "../../components/input/hooks/useInput";
import { Text } from "../../components/text";

const TitleField = () => {
  const { value, changeHandler } = useInputString(titleAtom);
  return (
    <>
      <Text>제목</Text>
      <Input type="text" name="title" value={value} onChange={changeHandler} />
    </>
  );
};

export default TitleField;

import React from "react";
import { titleAtom } from "../../atoms/todo";
import { Input } from "../../components/input/input";
import { useInputString } from "../../components/input/hooks/useInput";

const TitleField = () => {
  const { value, changeHandler } = useInputString(titleAtom);
  return (
    <>
      <div>제목</div>
      <Input type="text" name="title" value={value} onChange={changeHandler} />
    </>
  );
};

export default TitleField;

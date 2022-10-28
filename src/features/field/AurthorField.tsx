import React from "react";
import { authorAtom } from "../../atoms/todo";
import { Input } from "../../components/input/input";
import { useInputString } from "../../components/input/hooks/useInput";

const AuthorField = () => {
  const { value, changeHandler } = useInputString(authorAtom);
  return (
    <>
      <div>작성자</div>
      <Input type="text" name="author" value={value} onChange={changeHandler} />
    </>
  );
};

export default AuthorField;

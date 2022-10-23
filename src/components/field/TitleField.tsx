import React from "react";
import useInputAtom from "../../hooks/useInput";
import { titleAtom } from "../../pages/atoms";
import Input from "../Input";

const TitleField = () => {
  const { value, changeHandler } = useInputAtom(titleAtom);
  return (
    <div>
      <span>Title</span>
      <Input value={value} onChange={changeHandler} />
    </div>
  );
};

export default TitleField;

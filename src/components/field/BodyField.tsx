import React from "react";
import useInputAtom from "../../hooks/useInput";
import { bodyAtom } from "../../pages/atoms";
import Input from "../Input";

const BodyField = () => {
  const { value, changeHandler } = useInputAtom(bodyAtom);
  return (
    <div>
      <span>Body:</span>
      <Input value={value} onChange={changeHandler} />
    </div>
  );
};

export default BodyField;

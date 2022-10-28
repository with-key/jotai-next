import React from "react";
import { PrimitiveAtom, useAtom } from "jotai";

export const useInputString = (atom: PrimitiveAtom<string>) => {
  const [value, setTitle] = useAtom(atom);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };
  return { value, changeHandler };
};

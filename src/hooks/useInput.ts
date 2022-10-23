import React from "react";
import { PrimitiveAtom, useAtom } from "jotai";

const useInputAtom = (atom: PrimitiveAtom<string>) => {
  const [value, setValue] = useAtom(atom);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, changeHandler };
};

export default useInputAtom;

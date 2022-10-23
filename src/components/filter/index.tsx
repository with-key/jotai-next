import React from "react";
import { useAtom } from "jotai";
import { termAtom } from "../../pages/atoms";

const Filter = () => {
  const [prefix, setPrefix] = useAtom(termAtom);
  return (
    <div>
      <span>Filter prefix:</span>
      <input value={prefix} onChange={(e) => setPrefix(e.target.value)} />
    </div>
  );
};

export default Filter;

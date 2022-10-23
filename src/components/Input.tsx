import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ value, onChange }: Props) => {
  return <input type="text" value={value} onChange={onChange} />;
};

export default Input;

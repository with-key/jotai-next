import React from "react";
import styled from "styled-components";

type Props = {
  type: "text" | "number";
  name: string;
  value: string | number;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const Input = ({ value, onChange, name }: Props) => {
  return <StInput value={value} onChange={onChange} name={name} />;
};

const StInput = styled.input`
  width: 100%;
  height: 41px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  padding: 12px;
  box-sizing: border-box;
`;

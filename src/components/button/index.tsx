import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
};

export const Button = ({ children, onClick }: Props) => {
  return <Stbutton onClick={onClick}>{children}</Stbutton>;
};

const Stbutton = styled.button`
  width: 100%;
  border: none;
  height: 40px;
  background-color: teal;
  color: #fff;
  border-radius: 8px;
`;

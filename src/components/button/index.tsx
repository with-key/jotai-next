import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
};

const Button = ({ children, ...rest }: Props) => {
  return <button {...rest}>{children}</button>;
};

export default Button;

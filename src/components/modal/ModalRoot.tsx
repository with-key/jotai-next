import React, { ReactNode } from "react";
import { atom, Provider } from "jotai";

const modalStatusAtom = atom(false);
export const modalContext = { modalStatusAtom };

type Props = {
  children: ReactNode;
};

export const ModalRoot = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};

import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

type Props = {
  children: ReactNode;
  dir?: "col" | "row";
  gap?: number;
};

export const Flex = ({ children, dir = "row", gap }: Props) => {
  return (
    <StFlex dir={dir} gap={gap}>
      {children}
    </StFlex>
  );
};

const StFlex = styled.div<Omit<Props, "children">>`
  display: flex;
  flex-direction: ${({ dir }) => (dir === "col" ? "column" : "row")};
  gap: ${({ gap }) => `${gap}px`};
`;

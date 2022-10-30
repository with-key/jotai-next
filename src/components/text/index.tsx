import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Text = React.memo(function Text({ children }: Props) {
  // memo 정상 작동, React devtool 에서 리렌더 되는 것처럼 보이는 버그 있음
  return <h5>{children}</h5>;
});

import { atom, useAtom } from "jotai";
import React, { useMemo } from "react";
import { selectedAtom, TodoAtom } from "../../pages/atoms";

const Item = ({ itemAtom }: { itemAtom: TodoAtom }) => {
  const [{ title, body }] = useAtom(itemAtom);
  const [selected, setSelected] = useAtom(
    useMemo(
      () =>
        atom(
          (get) => get(selectedAtom) === itemAtom,
          (_get, set) => set(selectedAtom, itemAtom)
        ),
      [itemAtom]
    )
  );
  return (
    <div
      style={{
        padding: "0.1em",
        backgroundColor: selected ? "lightgray" : "transparent",
      }}
      onClick={setSelected}
    >
      {title}, {body}
    </div>
  );
};

export default Item;

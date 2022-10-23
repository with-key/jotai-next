import { useAtom } from "jotai";
import React from "react";
import { searchTodoList } from "../pages/atoms";
import Item from "./item";

const List = () => {
  const [list] = useAtom(searchTodoList);
  return (
    <div
      style={{
        width: "100%",
        height: "8em",
        overflow: "scroll",
        border: "2px solid gray",
      }}
    >
      {list.map((item) => {
        return <Item key={String(item)} itemAtom={item} />;
      })}
    </div>
  );
};

export default List;

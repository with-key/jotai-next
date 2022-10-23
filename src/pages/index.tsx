import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import {
  TodoAtom,
  titleAtom,
  bodyAtom,
  termAtom,
  searchTodoList,
  selectedAtom,
  createAtom,
  updateAtom,
  deleteAtom,
} from "./atoms";
import TitleField from "../components/field/TitleField";
import List from "../components/List";
import Filter from "../components/filter";
import BodyField from "../components/field/BodyField";
import Button from "../components/button";

const CreateButton = () => {
  const [enabled, create] = useAtom(createAtom);
  return (
    <button disabled={!enabled} onClick={create}>
      Create
    </button>
  );
};

const UpdateButton = () => {
  const [enabled, update] = useAtom(updateAtom);
  return (
    <button disabled={!enabled} onClick={update}>
      Update
    </button>
  );
};

const DeleteButton = () => {
  const [enabled, del] = useAtom(deleteAtom);
  return (
    <button disabled={!enabled} onClick={del}>
      Delete
    </button>
  );
};

const App = () => {
  // const [enabled, create] = useAtom(createAtom);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div style={{ width: "45%" }}>
          <Filter />
          <List />
        </div>
        <div style={{ width: "45%", margin: "auto" }}>
          <TitleField />
          <BodyField />
        </div>
      </div>
      <CreateButton />
      {/* <Button disabled={!enabled} onClick={create}>
        Create
      </Button> */}
      <UpdateButton />
      <DeleteButton />
    </div>
  );
};

export default App;

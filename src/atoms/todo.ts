import { atom, useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "../types/todo.type";

// atoms
export const idAtom = atom<number>(0);
export const titleAtom = atom<string>("");
export const authorAtom = atom<string>("");

export const setTodoFromServerState = atom(
  (get) => {
    const id = get(idAtom);
    const title = get(titleAtom);
    const author = get(authorAtom);

    return { id, title, author };
  },
  (_, set, payload: Todo) => {
    set(idAtom, payload.id);
    set(titleAtom, payload.title);
    set(authorAtom, payload.author);
  }
);

export const useFetchTodo = (id: string | undefined) => {
  const [todo, setTodo] = useAtom(setTodoFromServerState);

  const fetcher = async () => {
    const { data } = await axios.get(`http://localhost:4000/posts/${id}`);
    return data;
  };

  const { data, ...rest } = useQuery(["todo", id], fetcher, {
    enabled: Boolean(id),
    onSuccess: (todo) => {
      setTodo(todo);
    },
  });

  return { ...rest, todo };
};

export const submitAtom = atom(null, (get, set, submit) => {
  const todo = get(setTodoFromServerState);
  console.log(todo);
});

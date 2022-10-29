import { atom, useAtomValue } from "jotai";
import axios from "axios";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Todo, TodoDto } from "../types/todo.type";
import { useUpdateAtom } from "jotai/utils";

// atoms
export const idAtom = atom<number>(0);
export const titleAtom = atom<string>("");
export const authorAtom = atom<string>("");

export const setTodoFromServerState = atom(
  (get) => {
    const title = get(titleAtom);
    const author = get(authorAtom);

    return { title, author };
  },
  (_, set, payload: Todo) => {
    set(idAtom, payload.id);
    set(titleAtom, payload.title);
    set(authorAtom, payload.author);
  }
);

export const addTodoAtom = atom(
  null,
  (get, set, mutate: UseMutateFunction<void, unknown, TodoDto, unknown>) => {
    const { title, author } = get(setTodoFromServerState);

    if (title === "" || author === "") {
      console.log("값이 비어있다.");
    } else {
      mutate({ title, author });
      set(titleAtom, "");
      set(authorAtom, "");
    }
  }
);

// create Todo hook
export const useAddTodo = () => {
  return useMutation(async (todo: TodoDto) => {
    const { data } = await axios.post("http://localhost:4000/posts", todo);
    return data;
  });
};

// read Todo hook
export const useFetchTodo = (id: string | undefined) => {
  const setTodo = useUpdateAtom(setTodoFromServerState);
  const title = useAtomValue(titleAtom);
  const author = useAtomValue(authorAtom);

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

  return { ...rest, todo: { title, author } };
};

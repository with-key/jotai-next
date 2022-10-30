import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { Todo } from "../types/todo.type";

export const todosAtom = atom<Todo[]>([]);
export const getTodos = atom(null, (get, set, payload: Todo[]) => {
  set(todosAtom, payload);
});

// hooks
export const useFetchTodos = () => {
  const set = useUpdateAtom(getTodos);
  const fetcher = async () => {
    const { data } = await axios.get(`http://localhost:4000/posts`);
    return data;
  };
  const { data, ...rest } = useQuery(["todos"], fetcher, {
    onSuccess: (data: Todo[]) => {
      set(data);
    },
  });

  return { todos: data, ...rest };
};

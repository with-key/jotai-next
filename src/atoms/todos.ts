import { atom, useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

// atoms
const idAtom = atom<number>(0);
const titleAtom = atom<string>("");
const userIdAtom = atom<number>(0);
const completedAtom = atom<boolean>(false);

const setTodoFromServerState = atom(
  (get) => {
    const id = get(idAtom);
    const title = get(titleAtom);
    const userId = get(userIdAtom);
    const completed = get(completedAtom);

    return { id, title, userId, completed };
  },
  (_, set, payload: Todo) => {
    set(idAtom, payload.id);
    set(titleAtom, payload.title);
    set(userIdAtom, payload.userId);
    set(completedAtom, payload.completed);
  }
);

export const useFetchTodo = (id: string | undefined) => {
  const [todo, setTodo] = useAtom(setTodoFromServerState);
  const fetcher = async () => {
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return result.data;
  };

  const { data, ...rest } = useQuery(["todo", id], fetcher, {
    enabled: Boolean(id),
    onSuccess: (todo) => {
      setTodo(todo);
    },
  });

  return { ...rest, todo };
};

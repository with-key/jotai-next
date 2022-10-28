import { atom } from "jotai";
import { Todo } from "../types/todo.type";

export const todosAtom = atom<Todo[]>([]);
export const getTodos = atom(null, (get, set, payload) => {});

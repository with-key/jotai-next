import axios from "axios";
import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Todo, TodoDto } from "../types/todo.type";

// atoms
export const idAtom = atom<number>(0);
export const titleAtom = atom<string>("");
export const authorAtom = atom<string>("");

// ---- create Todo start ----
export const addTodoAtom = atom(
  null,
  (get, set, mutate: UseMutateFunction<void, unknown, TodoDto, unknown>) => {
    const title = get(titleAtom);
    const author = get(authorAtom);

    if (title === "" || author === "") {
      console.log("값이 비어있다.");
    } else {
      mutate({ title, author });
      set(titleAtom, "");
      set(authorAtom, "");
    }
  }
);
export const useAddTodo = () => {
  const submit = useUpdateAtom(addTodoAtom);

  const mutation = useMutation(async (todo: TodoDto) => {
    const { data } = await axios.post("http://localhost:4000/posts", todo);
    return data;
  });

  return { mutation, submit };
};
// ---- create Todo features ----
export const addTodoEnable = atom((get) => {
  // 제목이 비어있는 경우
  // 작가가 비어있는 경우
});
// ---- create Todo end ----

// ---- read Todo start ----
export const setTodoAtom = atom(null, (_, set, payload: Todo) => {
  set(idAtom, payload.id);
  set(titleAtom, payload.title);
  set(authorAtom, payload.author);
});

export const useFetchTodo = (id: string | undefined) => {
  const setTodo = useUpdateAtom(setTodoAtom);

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

  return { ...rest };
};
// ---- read Todo end ----

// --- update Todo ----
export const updateTodoAtom = atom(null, (get, set, [mutate, id]) => {
  const title = get(titleAtom);
  const author = get(authorAtom);
  mutate({ title, author, id });
});

export const useUpdateTodo = () => {
  const { push } = useRouter();
  const set = useUpdateAtom(updateTodoAtom);
  const mutation = useMutation(
    async ({ id, ...todo }: Todo) => {
      const res = await axios.put(`http://localhost:4000/posts/${id}`, todo);
      return res.status;
    },
    {
      onSuccess: (status) => {
        if (status === 200) {
          return push("/todos");
        }
      },
      onError: () => {
        alert("에러 발생");
      },
    }
  );

  return { updateSubmit: set, mutation };
};
// ---- updete Todo end ----

// ---- delete Todo start ----
// ---- delete Todo end ----

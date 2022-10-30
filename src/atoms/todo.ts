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

type AtomMutateWithId<S, T> = [
  UseMutateFunction<S, unknown, T, unknown>,
  string
];

// atoms
export const idAtom = atom<number>(0);
export const titleAtom = atom<string>("");
export const authorAtom = atom<string>("");

export const todoAtom = atom<Todo>((get) => {
  const title = get(titleAtom);
  const id = get(idAtom);
  const author = get(authorAtom);

  return { title, id, author };
});

// ---- create Todo start ----
export const addTodoAtom = atom(
  null,
  /**
   * UseMutateFunction <onSuccess 파라미터 타입, , mutate 파라미터 타입, ,>
   */
  (get, set, mutate: UseMutateFunction<number, unknown, TodoDto, unknown>) => {
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
  const { push } = useRouter();
  const submit = useUpdateAtom(addTodoAtom);

  const mutation = useMutation(
    async (todo: TodoDto) => {
      const res = await axios.post("http://localhost:4000/posts", todo);
      return res.status;
    },
    {
      onSuccess: (status) => {
        if (status === 201) {
          return push(`/todos`);
        }
      },
    }
  );

  return { mutation, submit };
};
// ---- create Todo features ----

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
export const deleteTodoAtom = atom(
  null,
  (_get, _set, [mutate, id]: AtomMutateWithId<number, string>) => {
    mutate(id);
  }
);

export const useDeleteTodo = () => {
  const { push } = useRouter();
  const onDelete = useUpdateAtom(deleteTodoAtom);
  const mutateFn = async (id: string) => {
    const res = await axios.delete(`http://localhost:4000/posts/${id}`);
    return res.status;
  };

  const mutation = useMutation(mutateFn, {
    onSuccess: (staus) => {
      if (staus === 200) {
        return push("/todos");
      }
    },
  });

  return { onDelete, mutation };
};
// ---- delete Todo end ----

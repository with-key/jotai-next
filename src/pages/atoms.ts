import { ChildProcess } from "child_process";
import { atom, PrimitiveAtom } from "jotai";

type TodoType = { title: string; body: string };
export type TodoAtom = PrimitiveAtom<TodoType>; // 어디서 쓰는 타입?

export const titleAtom = atom(""); // 제목 초기값
export const bodyAtom = atom(""); // 내용 초기값
export const termAtom = atom("");
const todosAtom = atom<TodoAtom[]>([]);
const selectedTodoAtom = atom<TodoAtom | null>(null);

// todo 선택 기능
export const selectedAtom = atom(
  (get) => get(selectedTodoAtom),
  (get, set, nameItemAtom: TodoAtom | null) => {
    set(selectedTodoAtom, nameItemAtom);
    if (nameItemAtom) {
      const { title: name, body: surname } = get(nameItemAtom);
      set(titleAtom, name);
      set(bodyAtom, surname);
    }
  }
);

// 검색 조회 기능
export const searchTodoList = atom((get) => {
  const term = get(termAtom);
  const todos = get(todosAtom);
  if (!term) {
    return todos;
  }
  return todos.filter((todoAtom) => get(todoAtom).body.startsWith(term));
});

// 추가하기
export const createAtom = atom(
  (get) => !!get(titleAtom) && !!get(bodyAtom), // enabled
  (get, set) => {
    const title = get(titleAtom); // 다른 atom 가져와서 원래 값으로 변환 atom -> string
    const body = get(bodyAtom);

    if (title && body) {
      const todo: TodoAtom = atom({ title, body }); // 기존의 atom 값을 사용해서 새로운 atom 생성
      set(todosAtom, (prev) => {
        return [...prev, todo]; // todo는 atom 값이다.
      });
      set(titleAtom, ""); // title input setter
      set(bodyAtom, ""); // body input setter
      set(selectedAtom, null); // select 상태 setter
    }
  }
);

// 수정하기
export const updateAtom = atom(
  (get) => !!get(titleAtom) && !!get(bodyAtom) && !!get(selectedAtom),
  (get, set) => {
    const title = get(titleAtom);
    const body = get(bodyAtom);
    const selected = get(selectedAtom);
    if (title && body && selected) {
      set(selected, { title, body });
    }
  }
);

// 삭제하기
export const deleteAtom = atom(
  (get) => !!get(selectedAtom),
  (get, set) => {
    const selected = get(selectedAtom);
    if (selected) {
      set(todosAtom, (prev) => prev.filter((item) => item !== selected));
    }
  }
);

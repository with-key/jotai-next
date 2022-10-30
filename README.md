## jotai + tanstack query

### basic combination pattern

- 컴포넌트에서 atom getter를 하지 않고, atom 내부로 mutate를 주입하여 atom내부에서 mutate를 실행
- 컴포넌트에서 getter로 `title`, `author` 값을 구독하고 있으면, 해당 값이 변경될때마다 해당 input외에 다른 컴포넌트까지 같이 리렌더링이 되기 때문에 위와 같이 처리해보려고 함
- atom의 setter를 했을 때, atom 내부에서 현재 변경된 값을 `get()`으로 가져오고 setter의 파라미터로 주입된 `mutate`에 값들을 담아 실행됨

```ts
// atoms
export const idAtom = atom<number>(0);
export const titleAtom = atom<string>("");
export const authorAtom = atom<string>("");

// Add Todo Action
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

// Add Todo Mutation hook
export const useAddTodo = () => {
  const submit = useUpdateAtom(addTodoAtom);

  const mutation = useMutation(async (todo: TodoDto) => {
    const { data } = await axios.post("http://localhost:4000/posts", todo);
    return data;
  });

  return { mutation, submit };
};
```

### In Component

```ts
const Form = ({ isAddMode }: Props) => {
  const {
    query: { id },
  } = useRouter();

  const {
    submit,
    mutation: { mutate, isLoading },
  } = useAddTodo();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Flex dir="col" gap={16}>
        <TitleField />
        <AuthorField />
        <Button
          onClick={() => {
            submit(mutate);
          }}
        >
          {isAddMode ? "추가" : "수정"}
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
```

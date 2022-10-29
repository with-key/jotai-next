export interface Todo {
  id: number;
  title: string;
  author: string;
}

export interface TodoDto extends Omit<Todo, "id"> {}

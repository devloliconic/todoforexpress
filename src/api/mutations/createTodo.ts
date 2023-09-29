import { MutationFunction, useMutation } from "@tanstack/react-query";
import { instanse } from "../instanse";

type Params = {
  title: string;
  description: string;
  isCompleted: boolean;
};

type Response = {
  todo_id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

const createTodo: MutationFunction<Response, Params> = async ({
  title,
  description,
  isCompleted,
}) => {
  return (await instanse.post("/todos", { title, description, isCompleted }))
    .data;
};

export const useCreateTodos = () => useMutation(createTodo);

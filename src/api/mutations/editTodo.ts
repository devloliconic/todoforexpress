import { MutationFunction, useMutation } from "@tanstack/react-query";
import { instanse } from "../instanse";

type Params = {
  todo_id: number;
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

const editTodo: MutationFunction<Response, Params> = async ({
  title,
  todo_id,
  description,
  isCompleted,
}) => {
  return (
    await instanse.put(`/todos/${todo_id}`, { title, description, isCompleted })
  ).data;
};

export const useEditTodo = () => useMutation(editTodo);

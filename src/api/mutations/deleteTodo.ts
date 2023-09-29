import { MutateFunction, useMutation } from "@tanstack/react-query";
import { instanse } from "../instanse";

type Params = {
  id: number;
};

const deleteTodo: MutateFunction<unknown, unknown, Params> = async ({ id }) => {
  return (await instanse.delete(`/todos/${id}`)).data;
};

export const useDeleteTodo = () => useMutation(deleteTodo);

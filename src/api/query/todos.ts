import { QueryFunction, useQuery } from "@tanstack/react-query";
import { ToDo } from "../../_types/ToDos";
import { instanse } from "../instanse";

type Response = ToDo[];
const queryKey = ["todos"];
type QueryKey = typeof queryKey;

const getTodos: QueryFunction<Response, QueryKey> = async () => {
  return (await instanse.get("/todos")).data;
};

export const useTodos = () =>
  useQuery({
    queryFn: getTodos,
    queryKey: queryKey,
  });

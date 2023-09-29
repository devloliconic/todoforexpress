import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToDoList } from "./components/ToDoList/ToDoList";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToDoList />
    </QueryClientProvider>
  );
};

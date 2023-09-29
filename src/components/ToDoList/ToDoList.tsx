import { useEffect, useRef, useState } from "react";
import cls from "./ToDoList.module.css";
import { ToDo as TypeToDo } from "../../_types/ToDos";
import { ToDo } from "../ToDo/ToDo";
import { useTodos } from "../../api/query/todos";
import { useDeleteTodo } from "../../api/mutations/deleteTodo";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTodos } from "../../api/mutations/createTodo";
import { useEditTodo } from "../../api/mutations/editTodo";

export const ToDoList = () => {
  const { data: todos } = useTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: createTodo } = useCreateTodos();
  const { mutate: editTodo } = useEditTodo();

  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const editRef = useRef(false);
  const editTodoRef = useRef<TypeToDo | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleButtonClick = () => {
    if (editRef.current && editTodoRef.current) {
      editTodo(
        {
          todo_id: editTodoRef.current.todo_id,
          description,
          title,
          isCompleted: editTodoRef.current.isCompleted,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
          },
        }
      );

      editRef.current = false;
      editTodoRef.current = null;
      setTitle("");
      setDescription("");
      return;
    }
    createTodo(
      { title, description, isCompleted: false },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["todos"]);
        },
      }
    );
    setTitle("");
    setDescription("");
  };

  const handleDeleteClick = (id: number) => {
    deleteTodo(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["todos"]);
        },
      }
    );
  };

  const handleEditClick = (id: number) => {
    const indexById =
      todos?.length && todos.findIndex((it) => it.todo_id === id);
    todos?.length && setTitle(todos[indexById as number].title);
    todos?.length && setDescription(todos[indexById as number].description);
    editRef.current = true;
    editTodoRef.current = todos?.length
      ? JSON.parse(JSON.stringify(todos[indexById as number]))
      : {};
  };

  const handleCompletedClick = (id: number) => {
    const indexById =
      todos?.length && todos.findIndex((it) => it.todo_id === id);
    const currentTodo = todos?.length
      ? JSON.parse(JSON.stringify(todos[indexById as number]))
      : {};
    editTodo(
      {
        todo_id: currentTodo.todo_id,
        description: currentTodo.description,
        title: currentTodo.title,
        isCompleted: currentTodo.isCompleted ? false : true,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["todos"]);
        },
      }
    );
  };

  return (
    <div className={cls.container}>
      <div className={cls.list}>
        <header className={cls.header}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="title"
          />
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="description"
          />
          <button onClick={handleButtonClick}>create</button>
        </header>
        {todos &&
          todos.map((it) => (
            <ToDo
              onCompletedClick={handleCompletedClick}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              todo_id={it.todo_id}
              key={it.todo_id + title + description}
              title={it.title}
              description={it.description}
              isCompleted={it.isCompleted}
            />
          ))}
      </div>
    </div>
  );
};

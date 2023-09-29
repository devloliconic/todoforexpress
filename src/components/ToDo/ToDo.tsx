import { ToDo as ToDoType } from "../../_types/ToDos";
import cls from "./ToDo.module.css";

type Props = ToDoType & {
  onDeleteClick: (id: number) => void;
  onEditClick: (id: number) => void;
  onCompletedClick: (id: number) => void;
};

export const ToDo = ({
  isCompleted,
  todo_id,
  title,
  description,
  onEditClick,
  onDeleteClick,
  onCompletedClick,
}: Props) => {
  return (
    <div className={`${cls.container} ${isCompleted ? cls.completed : null}`}>
      <h5 className={cls.title}>{title}</h5>
      <p>{description}</p>
      <button onClick={() => onDeleteClick(todo_id)}>
        {isCompleted ? "☑" : "☒"}
      </button>
      <button onClick={() => onEditClick(todo_id)}>✎</button>
      <button onClick={() => onCompletedClick(todo_id)}>☺</button>
    </div>
  );
};

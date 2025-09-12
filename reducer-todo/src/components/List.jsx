import { useContext } from "react";
import { ToDoContext } from "../context/Provider";
import { ToDoItem } from "./ToDoItem";
import "../styles/list.css"

export const List = () => {
  const { state } = useContext(ToDoContext);

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "ALL") return true;
    if (state.filter === "COMPLETED") return todo.completed;
    if (state.filter === "ACTIVE") return !todo.completed;
  });

  return (
    <div className="list">
      {filteredTodos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

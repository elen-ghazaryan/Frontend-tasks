import { AddToDo } from "./AddToDo"
import { List } from "./List"
import { ToDoFilter } from "./ToDoFilter"
import "../styles/todo-list.css"

export const ToDoList = () => {
  return (
    <div className="todo-app">
      <h1 className="todo-title">My Todo App</h1>
      <AddToDo />
      <ToDoFilter />
      <List />
    </div>
  );
};
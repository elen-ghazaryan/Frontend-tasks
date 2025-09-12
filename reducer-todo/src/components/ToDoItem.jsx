import { useContext, useState } from "react";
import { ToDoContext } from "../context/Provider";
import "../styles/todo-item.css";

export const ToDoItem = ({ todo }) => {
  const { dispatch } = useContext(ToDoContext);

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <p>{todo.text}</p>
      <div className="todo-actions">
        <button
          className="delete-btn"
          onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
        >
          delete
        </button>
        <button
          className="complete-btn"
          onClick={() => dispatch({ type: "COMPLETE", payload: todo.id })}
        >
          {todo.completed ? "cancel" : "complete"}
        </button>
      </div>
    </div>
  );
};

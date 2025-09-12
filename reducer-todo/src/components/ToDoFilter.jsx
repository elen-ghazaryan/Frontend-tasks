import { useContext } from "react";
import { ToDoContext } from "../context/Provider";
import "../styles/todo-filter.css";

export const ToDoFilter = () => {
  const { state, dispatch } = useContext(ToDoContext);

  return (
    <div className="todo-filter">
      <button
        className={state.filter === "ALL" ? "active" : ""}
        onClick={() =>
          dispatch({
            type: "SET_FILTER",
            payload: "ALL",
          })
        }
      >
        All
      </button>
      <button
        className={state.filter === "COMPLETED" ? "active" : ""}
        onClick={() =>
          dispatch({
            type: "SET_FILTER",
            payload: "COMPLETED",
          })
        }
      >
        Completed
      </button>
      <button
        className={state.filter === "ACTIVE" ? "active" : ""}
        onClick={() =>
          dispatch({
            type: "SET_FILTER",
            payload: "ACTIVE",
          })
        }
      >
        Active
      </button>
    </div>
  );
};

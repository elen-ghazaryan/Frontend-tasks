import "../styles/todoItem.css"

export const ToDoItem = ({ todo, onDelete, toggleCompleted }) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <p>{todo.text}</p>
      <div className="todo-buttons">
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
        <button className="toggle-btn" onClick={() => toggleCompleted(todo.id)}>
          {todo.completed ? "Cancel" : "Complete"}
        </button>
      </div>
    </div>
  );
};

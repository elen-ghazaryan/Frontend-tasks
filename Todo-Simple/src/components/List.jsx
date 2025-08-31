import { ToDoItem } from "./ToDoItem";
import "../index.css"

export const List = ({ items, onDelete, toggleCompleted }) => {
  return (
    <>
      <div className="list">
        {
          items.map(todo => <ToDoItem 
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            toggleCompleted={toggleCompleted}
          />)
        }  
      </div>
    </>
  );
};

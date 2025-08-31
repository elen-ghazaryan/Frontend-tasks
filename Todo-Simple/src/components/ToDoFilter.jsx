import "../styles/todoFilter.css"

export const ToDoFilter = ({ handleFilter,filter }) => {
  const filters = ["all", "completed", "active"];
 

  return (
    <div className="todo-filters">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => handleFilter(f)} 
          style={{
            backgroundColor: filter === f ? "green" : "gray",
            color: "white",
            margin: "0 5px",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

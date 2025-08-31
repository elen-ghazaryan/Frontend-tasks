import { use, useState } from "react";
import { AddToDo } from "./AddToDo";
import { List } from "./List";
import { ToDoFilter } from "./ToDoFilter";

export const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all")

  const handleAdd = (text) => {
    setTodos([
      ...todos,
      {
        text,
        completed: false,
        id: Date.now(),
      },
    ]);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => id != todo.id));
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } 
          : todo
      )
    );
  };

  const handleFilter = (key) => {
    setFilter(key)
  }

  const filteredTodos = todos.filter(todo => {
    if(filter === "all") return true;
    if(filter === "completed") return todo.completed;
    if(filter === "active") return !todo.completed;
  })

  return (
    <>
      <AddToDo onAdd={handleAdd} />
      <ToDoFilter handleFilter={handleFilter} filter={filter} />
      <List 
        items={filteredTodos} 
        onDelete={handleDelete}
        toggleCompleted={toggleCompleted}  
      />
    </>
  );
};

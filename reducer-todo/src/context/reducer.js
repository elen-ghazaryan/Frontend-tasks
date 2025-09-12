export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    case "COMPLETE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "ADD":
      return {
        ...state,
        todos: [...state.todos, payload]
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: payload  // "ALL"/"COMPLETED"/"ACTIVE"
      }
    default:
      return state;
  }
};

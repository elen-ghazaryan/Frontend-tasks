import { ToDoList } from "./components/ToDoList";
import { ToDoProvider } from "./context/Provider";

function App() {
  
  return (
    <ToDoProvider>
      <ToDoList />
    </ToDoProvider>
  );
}

export default App;

import { UserList } from "./components/UserList"
import { AddUser } from "./components/AddUser"
import { DataProvider } from "./context/Provider"

function App() {
  
  return (
    <div>
      <DataProvider>
        <UserList />
        <AddUser />
      </DataProvider>
    </div>
  )
}

export default App

import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import axios from "axios"

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4002/users")
      .then(res => setUsers(res.data)); 
  },[])

  const handleAdd = (data) => {
    let salary;
    if(data.level === "junior") 
      salary = 500;
    else if(data.level === "middle")
      salary = 800;
    else if(data.level === "senior") 
      salary = 1000;
    else
      salary = 200; 
    
    axios
    .post("http://localhost:4002/users", {...data, salary})
    .then(resp => setUsers([...users, {...resp.data}]))
    .catch(err => console.error(err))
  }

  const handleDelete = (id) => {
    axios
    .delete(`http://localhost:4002/users/${id}`)
    .then((resp) => setUsers(users.filter(user => user.id !== resp.data.id)))
    .catch((err) => console.error(err))
  }

  const handleSalaryChange = (id, newSalary) => {
    axios
    .patch(`http://localhost:4002/users/${id}`, {salary: newSalary})
    .then(resp => {
      setUsers(users.map(user => 
        user.id == id ? {...user, salary:newSalary}
        : user
      ))
    })
  }
  
  return (
    <UserContext.Provider value={{ 
      users,
      onAdd: handleAdd,
      onDelete: handleDelete,
      onSalaryChange: handleSalaryChange 
    }}>
      {children}
    </UserContext.Provider>
  );
};

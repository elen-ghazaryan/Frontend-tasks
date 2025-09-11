import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import "../styles/userItem.css"

export const UserItem = ({ user }) => {
  const { onDelete, onSalaryChange } = useContext(UserContext)

  return <div className="user-card">
    <h3>Name: {user.name}</h3>
    <p>Age: {user.age} years old</p>

    <div className="salary">
      <p>Salary: {user.salary} USD</p>
    </div>
    <div className="actions">
      <button className="delete-btn" onClick={() => onDelete(user.id)} >
        delete
      </button>
      <button className="up-btn" onClick={() => onSalaryChange(user.id, user.salary + 100)} >
        Salary Up
      </button>
      <button className="down-btn" onClick={() => onSalaryChange(user.id, user.salary - 100)} disabled={user.salary <= 100}>
        Salary Down
      </button>
    </div>
  </div>
}
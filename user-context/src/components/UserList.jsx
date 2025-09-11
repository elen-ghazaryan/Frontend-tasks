import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { UserItem } from "./UserItem"
import "../styles/userList.css"

export const UserList = () => {
  const { users } = useContext(UserContext)

  if (!users || users.length === 0) {
    return <p className="user-list-empty">No users found.</p>;
  }

  return <div className="user-list">
    {
      users.map(user => <UserItem key={user.id} user={user} />)
    }
  </div>
}

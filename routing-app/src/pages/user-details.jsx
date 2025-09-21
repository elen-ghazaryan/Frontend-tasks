import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "../pages-style/user-details.css"

export const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:4000/users/" + id)
    .then(res => setUser(res.data))
  }, [id])

  if (!user) {
    return <div className="loading">Loading user details...</div>
  }

   return (
    <div className="user-details">
      <h1 className="details-title">User Details</h1>

      <div className="details-card">
        <h2 className="details-name">{user.name}</h2>
        <p className="details-age">{user.age} years old</p>
      </div>

      <Link to={"/"} className="back-link">
        ← Back to Users
      </Link>
    </div>
  )
}


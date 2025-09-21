import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../pages-style/users.css";

export const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => setUsers(res.data));
  }, []);

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:4000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  return (
    <>
    <h1>Users</h1>
      <div className="users-container">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h2 className="user-name">{user.name}</h2>
            <p className="user-age">{user.age} years old</p>
            <Link to={"/users/" + user.id} className="user-link">
              detailes
            </Link>
            <button className="user-link" onClick={() => handleDelete(user.id)}>delete</button>
          </div>
        ))}
      </div>
      <div className="button-container">
        <Link to="/add" className="add-user-btn">
          Add New User
        </Link>
      </div>
    </>
  );
};

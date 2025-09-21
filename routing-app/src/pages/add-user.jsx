import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pages-style/add-user.css";

export const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post("http://localhost:4000/users", {
      name: data.name,
      age: Number(data.age),
    });
    navigate("/"); // go back to users list
  };

  return (
    <div className="add-user-page">
      <h1 className="page-title">➕ Add New User</h1>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter name"
          />
          {errors.name && (
            <span className="error-msg">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: { value: 1, message: "Age must be at least 1" },
              max: { value: 120, message: "Age must be 120 or less" },
            })}
            placeholder="Enter age"
          />
          {errors.age && (
            <span className="error-msg">{errors.age.message}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Add User
        </button>
      </form>
    </div>
  );
};

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import "../styles/addUser.css";

export const AddUser = () => {
  const { onAdd } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAdd = (data) => {
    onAdd(data);
    reset();
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit(handleAdd)}>
        <div>
          <label>name</label>
          <input {...register("name", { required: "Please fill the name" })} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div>
          <label>age</label>
          <input
            {...register("age", {
              required: "Please fill the age",
              valueAsNumber: true,
              validate: (value) => !isNaN(value) || "Age must be a number",
              min: { value: 1, message: "Age must be at least 1" },
              max: { value: 120, message: "Age must be less than 120" },
            })}
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>
        <div>
          <select {...register("level")}>
            <option>intern</option>
            <option>junior</option>
            <option>middle</option>
            <option>senior</option>
          </select>
        </div>

        <button>Save</button>
      </form>
    </div>
  );
};

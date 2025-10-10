import './App.css';
import { useForm } from './hooks/useForm';

type FormData = {
  name: string;
  age: number;
};

function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset({ name: "", age: 0 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label>Age</label>
        <input
          type="number"
          {...register("age", {
            required: "Age is required",
            min: { value: 16, message: "You must be older than 16" },
            max: { value: 45, message: "You must be younger than 45" },
            defaultValue: 16
          })}
        />
        {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;

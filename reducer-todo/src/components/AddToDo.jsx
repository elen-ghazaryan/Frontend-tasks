import { useContext } from "react"
import { useForm } from "react-hook-form"
import { ToDoContext } from "../context/Provider"
import "../styles/add-todo.css"

export const AddToDo = () => {
    const {register, handleSubmit, formState: {errors }, reset } = useForm()
    const { dispatch } = useContext(ToDoContext)

    const onSubmit = data => {
        dispatch({
            type:"ADD", 
            payload:{...data, completed:false, id:Date.now()}
        })
        reset()
    }

    return <div className="add-todo">
        <h2>Add Todo</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
            <input 
                className="todo-input"
                {...register("text", {required: "Please fill the field before saving"})}
                placeholder="Enter your task..."
            />
            {errors.text && <p className="error">{errors.text.message}</p>}
        
            <button className="save-btn">Save</button>
        </form>
    </div>
}
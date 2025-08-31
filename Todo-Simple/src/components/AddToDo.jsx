import { useState } from "react"
import "../styles/addTodo.css"

export const AddToDo = ({ onAdd }) => {
    const [text, setText] = useState("")
    const [error, setError] = useState("")

    const handleSave = () => {
        if(!text.trim()) {
            return setError("Please fill the text")
        }
        setError("")
        onAdd(text)
        setText("")
    }

    return (
        <div className="add-todo">
            <p>Add to do</p>
            <input 
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={error || "Enter something"}
                className={error ? "error" : ""}
            />
            <button onClick={handleSave}>Save</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
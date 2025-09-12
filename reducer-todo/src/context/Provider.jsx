import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { initialState } from "./state";

export const ToDoContext = createContext()

export const ToDoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)  //dispatch kanchelis state poxvelu e nor render lini kanchi shnorhiv

    return <ToDoContext.Provider value = {{state, dispatch}}>
        { children }
    </ToDoContext.Provider>
}
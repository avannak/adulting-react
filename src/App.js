import React, { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { TodoContext } from "./contexts/TodoContext";

function App() {
  const [removeItem, setRemoveItem] = useState("");
  const [completeTxt, setCompleteTxt] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [taskItem, setTaskItem] = useState("");
  const [btnType, setBtnType] = useState("");
  const [updatedMsg, setUpdatedMsg] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [dragNotifToggled, setDragNotifState] = useState(false);
  const [stateToggled, setStatusState] = useState(false);
  const [color, setColor] = useState("white");
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todos");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed the JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });

  return (
    <div className="todo-app">
      <TodoContext.Provider
        value={{
          todos,
          setTodos,
          color,
          setColor,
          removeItem,
          setRemoveItem,
          completeTxt,
          setCompleteTxt,
          updateItem,
          setUpdateItem,
          taskItem,
          setTaskItem,
          btnType,
          setBtnType,
          updatedMsg,
          setUpdatedMsg,
          newMsg,
          setNewMsg,
          isEditing,
          setIsEditing,
          dragNotifToggled,
          setDragNotifState,
          stateToggled,
          setStatusState,
        }}
      >
        <TodoList></TodoList>
      </TodoContext.Provider>
    </div>
  );
}

export default App;

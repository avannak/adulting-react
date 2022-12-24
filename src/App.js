import React, { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { TodoContext } from "./contexts/TodoContext";

function App() {
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

  const [color, setColor] = useState("white");
  return (
    <div className="todo-app">
      <TodoContext.Provider value={{ todos, setTodos, color, setColor }}>
        <TodoList></TodoList>
      </TodoContext.Provider>
    </div>
  );
}

export default App;

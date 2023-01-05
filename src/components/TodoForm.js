import React, { useState, useEffect, useRef, useContext } from "react";
import { v4 } from "uuid";
import { TodoContext } from "../contexts/TodoContext";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [counterStateToggled, setCounterState] = useState(() => false);
  const { todos, setTodos, color, setColor, isEditing, setIsEditing } =
    useContext(TodoContext);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    if (input === "") {
      setCounterState(false);
    }
  }, [input]);

  useEffect(() => {
    // console.log(isEditing);
  }, [color, setColor, setIsEditing]);

  const handleChange = (e) => {
    setCounterState(true);
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: v4(),
      text: input,
      colors: color,
    });
    setCounterState(false);
    setInput("");
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: v4(),
      text: input,
      colors: "white",
    });
    setCounterState(false);
    setInput("");
  };
  return (
    <>
      {props.edit ? (
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="add-container">
            <input
              type="text"
              value={input}
              placeholder="update your task"
              name="text"
              className="todo-input edit"
              onChange={handleChange}
              ref={inputRef}
              maxLength={100}
            />
            <button
              className="todo-button edit"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <form className="todo-form" onSubmit={handleNewTaskSubmit}>
          <div className="add-container">
            <input
              type="text"
              value={input}
              placeholder="enter a task"
              name="text"
              className="todo-input"
              onChange={handleChange}
              ref={inputRef}
              maxLength={100}
            />
            <button
              className={isEditing ? "todo-button disabled" : "todo-button"}
              disabled={isEditing ? true : false}
            >
              Add Task
            </button>
          </div>
        </form>
      )}
      <div
        style={{ color: "white" }}
        className={
          counterStateToggled ? "word-counter active" : "word-counter inactive"
        }
      >
        {100 - input.length} characters left
      </div>
    </>
  );
}

export default TodoForm;

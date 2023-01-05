import React, { useState, useEffect, useContext } from "react";
import TodoForm from "./TodoForm";
import Todo, { filterText } from "./Todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import adulting from "./assets/gifs/adulting-demo.gif";
import { RiInformationLine } from "react-icons/ri";
import { TodoContext } from "../contexts/TodoContext";

let taskItem = "";
let btnType = "";
let updatedMsg = "";
let newMsg = "";

function TodoList() {
  const {
    todos,
    setTodos,
    taskItem,
    setTaskItem,
    btnType,
    setBtnType,
    updatedMsg,
    setUpdatedMsg,
    newMsg,
    setNewMsg,
    removeItem,
    setRemoveItem,
  } = useContext(TodoContext);
  let data = JSON.parse(localStorage.getItem("todos"));
  const updateStorage = (updatedData) => {
    data = {
      ...JSON.parse(localStorage.getItem("todos")),
      ...updatedData,
    };
    localStorage.setItem("todos", JSON.stringify(data));
  };

  const [stateToggled, setStatusState] = useState(false);
  const [dragNotifToggled, setDragNotifState] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const changeStatus = (message, buttonType) => {
    const setStateToFalse = () => {
      setStatusState(false);
    };
    setTaskItem(message);
    setBtnType(buttonType);
    // getStatusMsg(message, buttonType);
    setStatusState(true);
    // console.log("setStatusState is: ", stateToggled);
    if (!stateToggled) {
      setTimeout(function () {
        setStateToFalse();
      }, 5000);
    }
    // console.log("setStatusState is: ", stateToggled);
  };
  const addTodo = (todo) => {
    // if empty string, do not add string to list.
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    setTaskItem(filterText(todo.text));
    changeStatus(filterText(todo.text), "addTodo");

    // console.log(todo, ...todos);
  };

  const getStatusMsg = (message, buttonType) => {
    let tskItem = message;
    let statusBtnType = buttonType;
    if (statusBtnType === "removeTodo") {
      return `removed "${tskItem}" from the list`;
    }
    if (statusBtnType === "addTodo") {
      return `added "${tskItem}" to the list`;
    }
    if (statusBtnType === "updateTodo") {
      return `updated "${updatedMsg}" to "${newMsg}"`;
    }
    return `added "${taskItem}" to the list`;
  };

  const updateTodo = (todoId, newValue, prevValue) => {
    updateStorage(todos);
    console.log("todos is:", todos);
    setUpdatedMsg(filterText(prevValue));
    setNewMsg(filterText(newValue.text));
    if (
      !newValue.text ||
      /^\s*$/.test(newValue.text) ||
      updatedMsg === newMsg
    ) {
      setTodos((prev) =>
        prev.map((item) => (item.id === todoId ? newValue : item))
      );
      return;
    } else {
      changeStatus(updatedMsg, "updateTodo");
      setTodos((prev) =>
        prev.map((item) => (item.id === todoId ? newValue : item))
      );
      setTaskItem(newValue);
    }
  };
  const completeTodo = (id, text) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    updateStorage(todos);
    setTodos(updatedTodos);
  };
  const removeTodo = (id, text) => {
    setTaskItem(removeItem);
    changeStatus(text, "removeTodo");
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };
  const getDraggableNotif = () => {
    setDragNotifState(true);
    if (!dragNotifToggled) {
      setTimeout(function () {
        setDragNotifState(false);
        localStorage.setItem("setDragNotifState", false);
      }, 6000);
    }
  };

  useEffect(() => {}, [taskItem, setRemoveItem, removeItem]);
  // "list-status active"
  return (
    <div>
      <h1 id="title-text">What is today's plan?</h1>
      <div className="form-container">
        <button onClick={getDraggableNotif} className="info-button">
          <RiInformationLine size={20}></RiInformationLine>
        </button>
        <TodoForm onSubmit={addTodo} />
      </div>
      <div
        className={
          dragNotifToggled
            ? "drag-notification active"
            : "drag-notification inactive"
        }
      >
        <img
          draggable="false"
          className="animated-gif"
          src={adulting}
          alt="This will display an animated GIF"
        />
        Hold and drag to re-arrange tasks!
      </div>
      <h1
        className={stateToggled ? "list-status active" : "list-status inactive"}
      >
        {getStatusMsg(taskItem, btnType)}
      </h1>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination.index;
          const data = JSON.parse(localStorage.getItem("todos"));
          todos.splice(desI, 0, todos.splice(srcI, 1)[0]);
          data.splice(desI, 0, data.splice(srcI, 1)[0]);
          localStorage.setItem("todos", JSON.stringify(data));

          // console.log(param);
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TodoList;

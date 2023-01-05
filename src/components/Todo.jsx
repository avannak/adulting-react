import React, { useState, useEffect, useContext } from "react";
import TodoForm from "./TodoForm";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { TodoContext } from "../contexts/TodoContext";

const StyledTodoContainer = styled.div`
  background: ${(props) => (props.dragging ? "#b5fdb5" : props.colors)};
  box-shadow: ${(props) => (props.dragging ? "1px 1px 20px black" : "none")};
  user-select: none;
  width: 100%;
  padding: 5px;
`;

// let currentClr = 'red';
// function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const filterText = (text) => {
  let filteredTxt = text && text.replace(/\s+/g, " ").trim();
  return filteredTxt && filteredTxt.trimEnd();
};

function Todo({ completeTodo, removeTodo, updateTodo }) {
  const {
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
    isEditing,
    setIsEditing,
  } = useContext(TodoContext);
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  // const componentRef = React.useRef();
  const rowRef = React.useRef(null);

  const submitUpdate = (value) => {
    console.log("value is:", value);
    let prevValue = updateItem;
    updateTodo(edit.id, value, prevValue);
    setEdit({
      id: null,
      value: "",
    });
  };

  const changeColor = (todoId, todos) => {
    todos.forEach((todo) => {
      if (todo.id === todoId) {
        if (todo.colors === "" || todo.colors === "white") {
          todo.colors = "lightcoral";
          setColor("lightcoral");
          localStorage.setItem("todos", JSON.stringify(todos));
          return;
        }
        if (todo.colors === "lightcoral") {
          todo.colors = "rgb(252, 196, 92)";
          setColor("rgb(252, 196, 92)");
          localStorage.setItem("todos", JSON.stringify(todos));
          return;
        }
        if (todo.colors === "rgb(252, 196, 92)") {
          todo.colors = "rgb(255, 243, 132)";
          setColor("rgb(255, 243, 132)");
          localStorage.setItem("todos", JSON.stringify(todos));
          return;
        }
        if (todo.colors === "rgb(255, 243, 132)") {
          todo.colors = "#7fe77f";
          setColor("#7fe77f");
          localStorage.setItem("todos", JSON.stringify(todos));
          return;
        }
        if (todo.colors === "#7fe77f") {
          todo.colors = "lightblue";
          setColor("lightblue");
          localStorage.setItem("todos", JSON.stringify(todos));
          return;
        }
        if (todo.colors === "lightblue") {
          todo.colors = "white";
          setColor("white");
          localStorage.setItem("todos", JSON.stringify(todos));
          return;
        }
      }
    });
  };

  useEffect(() => {
    // console.log("color is now: ", color);
  }, [color, setIsEditing, isEditing]);

  if (edit.id) {
    return (
      <div>
        <TodoForm edit={edit} onSubmit={submitUpdate} />
        {todos &&
          todos.map((todo, index) => (
            <div
              ref={rowRef}
              key={index}
              className={todo.isComplete ? "todo-row complete" : "todo-row"}
            ></div>
          ))}
      </div>
    );
  }

  return (
    todos &&
    todos?.map((todo, index) => (
      <div
        ref={rowRef}
        key={index}
        className={todo.isComplete ? "todo-row complete" : "todo-row"}
      >
        <Draggable key={todo.id} draggableId={todo.id} index={index}>
          {(provided, snapshot) => (
            <StyledTodoContainer
              id={todo.id}
              className="list-item"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              dragging={snapshot.isDragging ? true : false}
              colors={todo.colors}
            >
              <div
                className="todo-text"
                key={todo.id}
                onClick={() => {
                  completeTodo(todo.id, setCompleteTxt(filterText(todo.text)));
                }}
              >
                {todo.text}
              </div>
              <div className="icons">
                <div className="delete-icon">
                  <RiDeleteBinLine
                    size={28}
                    onClick={() => {
                      setRemoveItem(filterText(todo.text));
                      removeTodo(todo.id, filterText(todo.text));
                    }}
                  />
                </div>
                <div className="edit-icon">
                  <FaRegEdit
                    size={28}
                    onClick={() => {
                      setIsEditing(true);
                      console.log(todo.text);
                      const data = JSON.parse(localStorage.getItem("todos"));
                      localStorage.setItem("todos", JSON.stringify(data));
                      setEdit({ id: todo.id, value: filterText(todo.text) });
                      setColor(todo.colors);
                      setUpdateItem(filterText(todo.text));
                      console.log("data after pressing edit is: ", data);
                    }}
                  />
                </div>
                <div className="change-color-icon">
                  <HiOutlineColorSwatch
                    size={28}
                    onClick={() => {
                      console.log("id clicked is: ", todo.id);
                      changeColor(todo.id, todos);
                      // const data = JSON.parse(localStorage.getItem("todos"));
                      // localStorage.setItem("todos", JSON.stringify(data));
                      // changeColor(todo.id, data);
                      // console.log("data after pressing change color: ", data);
                    }}
                  />
                </div>
              </div>
            </StyledTodoContainer>
          )}
        </Draggable>
      </div>
    ))
  );
}

export default Todo;

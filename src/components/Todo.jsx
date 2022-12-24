import React, { useState, useEffect, useContext } from "react";
import TodoForm from "./TodoForm";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { TodoContext } from "../contexts/TodoContext";

const StyledTodoContainer = styled.div`
  background: ${(props) => (props.dragging ? "lightgreen" : props.colors)};
  box-shadow: ${(props) => (props.dragging ? "1px 1px 20px black" : "none")};
  user-select: none;
  width: 100%;
  padding: 5px;
`;
let removeItem = "";
let completeTxt = "";
let updateItem = "";

// let currentClr = 'red';
// function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const filterText = (text) => {
  let filteredTxt = text.replace(/\s+/g, " ").trim();
  return filteredTxt.trimEnd();
};

function Todo({ completeTodo, removeTodo, updateTodo }) {
  const { todos, setTodos, color, setColor } = useContext(TodoContext);
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  // const componentRef = React.useRef();
  const rowRef = React.useRef(null);

  const submitUpdate = (value) => {
    let prevValue = updateItem;
    updateTodo(edit.id, value, prevValue);
    setEdit({
      id: null,
      value: "",
    });
  };

  const changeColor = (todoId, todos) => {
    todos.forEach((todo) => {
      // console.log(todos);
      // console.log(todos);
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
          todo.colors = "lightgreen";
          setColor("lightgreen");
          localStorage.setItem("todos", JSON.stringify(todos));
          return;
        }
        if (todo.colors === "lightgreen") {
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
  }, [color]);

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
            >
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <StyledTodoContainer
                    id={todo.id}
                    className="list-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    colors={todo.colors}
                  >
                    <div
                      className="todo-text"
                      key={todo.id}
                      onClick={() =>
                        completeTodo(
                          todo.id,
                          (completeTxt = filterText(todo.text))
                        )
                      }
                    >
                      {todo.text}
                    </div>
                    <div className="icons">
                      <div className="delete-icon">
                        <RiDeleteBinLine
                          size={28}
                          onClick={() => {
                            removeTodo(
                              todo.id,
                              (removeItem = filterText(todo.text))
                            );
                          }}
                        />
                      </div>
                      <div className="edit-icon">
                        <FaRegEdit
                          size={28}
                          onClick={() => {
                            const data = JSON.parse(
                              localStorage.getItem("todos")
                            );
                            localStorage.setItem("todos", JSON.stringify(data));
                            setEdit({
                              id: todo.id,
                              value: filterText(todo.text),
                            });
                            updateItem = filterText(todo.text);
                            //   console.log("data after pressing edit is: ", data);
                          }}
                        />
                      </div>
                      <div className="change-color-icon">
                        <HiOutlineColorSwatch
                          size={28}
                          onClick={() => {
                            changeColor(todo.id, todos);
                          }}
                        />
                      </div>
                    </div>
                  </StyledTodoContainer>
                )}
              </Draggable>
            </div>
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
                  completeTodo(todo.id, (completeTxt = filterText(todo.text)));
                }}
              >
                {todo.text}
              </div>
              <div className="icons">
                <div className="delete-icon">
                  <RiDeleteBinLine
                    size={28}
                    onClick={() => {
                      removeTodo(todo.id, (removeItem = filterText(todo.text)));
                    }}
                  />
                </div>
                <div className="edit-icon">
                  <FaRegEdit
                    size={28}
                    onClick={() => {
                      const data = JSON.parse(localStorage.getItem("todos"));
                      localStorage.setItem("todos", JSON.stringify(data));
                      setEdit({ id: todo.id, value: filterText(todo.text) });
                      updateItem = filterText(todo.text);
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

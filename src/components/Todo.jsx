import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { Draggable } from 'react-beautiful-dnd';

export let removeItem = '';
export let completeTxt = '';
export let updateItem = '';
// let currentClr = 'red';
// function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const filterText = (text) => {
    let filteredTxt = text.replace(/\s+/g, ' ').trim();
    return filteredTxt.trimEnd();
}

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })
    // const componentRef = React.useRef();
    const rowRef = React.useRef(null);

    const getItemStyle = (isDragging, draggableStyle, rowId) => ({
        // basic styles to make the items look a bit nicer
        userSelect: "none",
        width: "100%",
        padding: "5px",

        //if not dragging, set color to what document element by id is currently

        // change background colour if dragging
        backgroundColor: getColor(rowId),
        // background: isDragging ? "lightgreen" : setColorTo(rowId, trigger),
        boxShadow: isDragging ? "2px 2px 10px black" : "none",
        // styles we need to apply on draggables 
        ...draggableStyle
    });

    const getColor = (rowId) => {

    }

    const setColorTo = (rowId, starting) => {
        if (starting === false) {
            return 'white';
        } else if (starting === true) {
            // localStorage.setItem(rowId, document.getElementById(rowId).style.backgroundColor)
            return document.getElementById(rowId).style.backgroundColor;
        } else {
            return 'white';
        }
    }

    const changeColor = (rowId, provided) => {

        let element = document.getElementById(rowId);
        if (element.style.backgroundColor === 'white') {
            // localStorage.setItem("backgroundColor", "lightcoral");
            return (document.getElementById(rowId).style.backgroundColor = "lightcoral");
        }
        if (element.style.backgroundColor === 'lightcoral') {
            // localStorage.setItem("backgroundColor", 'rgb(252, 196, 92)');
            return document.getElementById(rowId).style.backgroundColor = "rgb(252, 196, 92)";
        }
        if (element.style.backgroundColor === 'rgb(252, 196, 92)') {
            // localStorage.setItem("backgroundColor", 'rgb(255, 243, 132)');
            return document.getElementById(rowId).style.backgroundColor = "rgb(255, 243, 132)";
        }
        if (element.style.backgroundColor === 'rgb(255, 243, 132)') {
            // localStorage.setItem("backgroundColor", 'lightgreen');
            return document.getElementById(rowId).style.backgroundColor = "lightgreen";
        }
        if (element.style.backgroundColor === 'lightgreen') {
            // localStorage.setItem("backgroundColor", 'lightblue');
            return document.getElementById(rowId).style.backgroundColor = "lightblue";
        }
        if (element.style.backgroundColor === 'lightblue') {
            // localStorage.setItem("backgroundColor", 'rgb(192, 103, 255)');
            return document.getElementById(rowId).style.backgroundColor = "rgb(192, 103, 255)";
        }
        if (element.style.backgroundColor === 'rgb(192, 103, 255)') {
            // localStorage.setItem("backgroundColor", 'rgb(255, 173, 255)');
            return document.getElementById(rowId).style.backgroundColor = "rgb(255, 173, 255)";
        }
        if (element.style.backgroundColor === 'rgb(255, 173, 255)') {
            // localStorage.setItem("backgroundColor", 'white');
            return document.getElementById(rowId).style.backgroundColor = "white";
        }

    }

    const submitUpdate = value => {

        let prevValue = updateItem;
        updateTodo(edit.id, value, prevValue)
        setEdit({
            id: null,
            value: ''
        })
    }


    if (edit.id) {

        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }


    return (
        todos.map((todo, index) =>

            <div ref={rowRef} key={index} className={todo.isComplete ? 'todo-row complete' : 'todo-row'} >
                <Draggable key={todo.id} draggableId={todo.id} index={index} >
                    {(provided, snapshot) => (
                        <div id={todo.id} className="list-item" ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={
                                getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style,
                                    todo.id
                                )}>

                            <div className="todo-text" key={todo.id} onClick={() => completeTodo(todo.id, completeTxt = filterText(todo.text))}>
                                {todo.text}
                            </div>
                            <div className="icons">
                                <div className='delete-icon'>
                                    <RiDeleteBinLine size={28} onClick={() => removeTodo(todo.id, removeItem = filterText(todo.text))}

                                    />
                                </div>
                                <div className="edit-icon">
                                    <FaRegEdit size={28} onClick={() => {
                                        setEdit({ id: todo.id, value: filterText(todo.text) });
                                        updateItem = filterText(todo.text);

                                    }} />
                                </div>
                                <div className="change-color-icon">
                                    <HiOutlineColorSwatch size={28} onClick={() => {
                                        changeColor(todo.id, provided);
                                    }} />
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable >
            </div >
        )
    )
}

export default Todo
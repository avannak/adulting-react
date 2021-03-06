import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { Draggable } from 'react-beautiful-dnd';

let removeItem = '';
let completeTxt = '';
let updateItem = '';

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
        backgroundColor: isDragging ? "rgb(123, 255, 123)" : getColor(rowId),
        // background: isDragging ? "lightgreen" : setColorTo(rowId, trigger),
        boxShadow: isDragging ? "2px 2px 10px yellow" : "none",
        // styles we need to apply on draggables 
        ...draggableStyle
    });

    const getColor = (rowId) => {
        const data = JSON.parse(localStorage.getItem('todos'));
        if (data) {
            for (const [key, value] of Object.keys(data)) {
                if (data[key].id === rowId) {
                    return data[key].colors;
                }
            }
        } else {
            return "white";
        }
        // // console.log(rowId);
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

    const changeColor = (rowId, locData) => {
        const getIdFromStrge = (locData) => {
            for (const [key, value] of Object.keys(locData)) {
                if (locData[key].id === rowId) {
                    return locData[key].id;
                }
            }
        }
        const getColorsFromStrge = (locData) => {
            for (const [key, value] of Object.keys(locData)) {
                if (locData[key].id === rowId) {
                    return locData[key].colors;
                }
            }
        }
        const updateColorStrge = (locData, color) => {
            for (const [key, value] of Object.keys(locData)) {
                // // console.log(key, value);
                switch (color) {
                    case "white":
                        if (locData[key].id === rowId) {
                            locData[key].colors = "lightcoral";
                            // // console.log("colors is now: ", locData[key].colors)
                            localStorage.setItem('todos', JSON.stringify(locData));
                            // // console.log("LOC STORAGE IS NOW: ", localStorage.getItem('todos'));
                        }
                        break;
                    case "lightcoral":
                        if (locData[key].id === rowId) {
                            locData[key].colors = "rgb(252, 196, 92)";
                            // console.log("colors is now: ", locData[key].colors)
                            localStorage.setItem('todos', JSON.stringify(locData));
                            // console.log("LOC STORAGE IS NOW: ", localStorage.getItem('todos'));

                        }
                        break;
                    case "rgb(252, 196, 92)":
                        if (locData[key].id === rowId) {
                            locData[key].colors = "rgb(255, 243, 132)";
                            // console.log("colors is now: ", locData[key].colors)
                            localStorage.setItem('todos', JSON.stringify(locData));
                            // console.log("LOC STORAGE IS NOW: ", localStorage.getItem('todos'));

                        }
                        break;
                    case "rgb(255, 243, 132)":
                        if (locData[key].id === rowId) {
                            locData[key].colors = "lightgreen";
                            // console.log("colors is now: ", locData[key].colors)
                            localStorage.setItem('todos', JSON.stringify(locData));
                            // console.log("LOC STORAGE IS NOW: ", localStorage.getItem('todos'));

                        }
                        break;
                    case "lightgreen":
                        if (locData[key].id === rowId) {
                            locData[key].colors = "lightblue";
                            // console.log("colors is now: ", locData[key].colors)
                            localStorage.setItem('todos', JSON.stringify(locData));
                            // console.log("LOC STORAGE IS NOW: ", localStorage.getItem('todos'));

                        }
                        break;
                    case "lightblue":
                        if (locData[key].id === rowId) {
                            locData[key].colors = "rgb(192, 103, 255)";
                            // console.log("colors is now: ", locData[key].colors)
                            localStorage.setItem('todos', JSON.stringify(locData));
                            // console.log("LOC STORAGE IS NOW: ", localStorage.getItem('todos'));

                        }
                        break;
                    case "rgb(192, 103, 255)":
                        if (locData[key].id === rowId) {
                            locData[key].colors = "rgb(255, 173, 255)";
                            // console.log("colors is now: ", locData[key].colors)
                            localStorage.setItem('todos', JSON.stringify(locData));
                            // console.log("LOC STORAGE IS NOW: ", localStorage.getItem('todos'));

                        }
                        break;
                    case "rgb(255, 173, 255)":
                        if (locData[key].id === rowId) {
                            locData[key].colors = "white";
                            // console.log("colors is now: ", locData[key].colors)
                            localStorage.setItem('todos', JSON.stringify(locData));
                            // console.log("LOC STORAGE IS NOW: ", localStorage.getItem('todos'));

                        }
                        break;
                    default:
                    // console.log("There is no color");
                }
            }
        }
        let element = document.getElementById(rowId);
        if (rowId === getIdFromStrge(locData) && getColorsFromStrge(locData) === 'white') {
            updateColorStrge(locData, 'white');
            // localStorage.setItem("backgroundColor", "lightcoral");
            return (document.getElementById(rowId).style.backgroundColor = "lightcoral");
        }
        if (rowId === getIdFromStrge(locData) && getColorsFromStrge(locData) === 'lightcoral') {
            // localStorage.setItem("backgroundColor", 'rgb(252, 196, 92)');
            updateColorStrge(locData, 'lightcoral');
            return document.getElementById(rowId).style.backgroundColor = "rgb(252, 196, 92)";
        }
        if (rowId === getIdFromStrge(locData) && getColorsFromStrge(locData) === 'rgb(252, 196, 92)') {
            // localStorage.setItem("backgroundColor", 'rgb(255, 243, 132)');
            updateColorStrge(locData, 'rgb(252, 196, 92)');
            return document.getElementById(rowId).style.backgroundColor = "rgb(255, 243, 132)";
        }
        if (rowId === getIdFromStrge(locData) && getColorsFromStrge(locData) === 'rgb(255, 243, 132)') {
            // localStorage.setItem("backgroundColor", 'lightgreen');
            updateColorStrge(locData, 'rgb(255, 243, 132)');
            return document.getElementById(rowId).style.backgroundColor = "lightgreen";
        }
        if (rowId === getIdFromStrge(locData) && getColorsFromStrge(locData) === 'lightgreen') {
            // localStorage.setItem("backgroundColor", 'lightblue');
            updateColorStrge(locData, 'lightgreen');
            return document.getElementById(rowId).style.backgroundColor = "lightblue";
        }
        if (rowId === getIdFromStrge(locData) && getColorsFromStrge(locData) === 'lightblue') {
            // localStorage.setItem("backgroundColor", 'rgb(192, 103, 255)');
            updateColorStrge(locData, 'lightblue');
            return document.getElementById(rowId).style.backgroundColor = "rgb(192, 103, 255)";
        }
        if (rowId === getIdFromStrge(locData) && getColorsFromStrge(locData) === 'rgb(192, 103, 255)') {
            // localStorage.setItem("backgroundColor", 'rgb(255, 173, 255)');
            updateColorStrge(locData, 'rgb(192, 103, 255)');
            return document.getElementById(rowId).style.backgroundColor = "rgb(255, 173, 255)";
        }
        if (rowId === getIdFromStrge(locData) && getColorsFromStrge(locData) === 'rgb(255, 173, 255)') {
            // localStorage.setItem("backgroundColor", 'white');
            updateColorStrge(locData, 'rgb(255, 173, 255)');
            return document.getElementById(rowId).style.backgroundColor = "white";
        }

    }

    const submitUpdate = value => {

        let prevValue = updateItem;
        updateTodo(edit.id, value, prevValue)
        setEdit({
            id: null,
            value: '',
        })

    }


    if (edit.id) {

        return (

            <div>
                <TodoForm edit={edit} onSubmit={submitUpdate} />
                {todos.map((todo, index) =>

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
                                            <RiDeleteBinLine size={28} onClick={() => {
                                                removeTodo(todo.id, removeItem = filterText(todo.text))
                                            }}

                                            />
                                        </div>
                                        <div className="edit-icon">
                                            <FaRegEdit size={28} onClick={() => {
                                                const data = JSON.parse(localStorage.getItem('todos'));
                                                localStorage.setItem('todos', JSON.stringify(data));
                                                setEdit({ id: todo.id, value: filterText(todo.text) });
                                                updateItem = filterText(todo.text);
                                                console.log("data after pressing edit is: ", data);
                                            }} />
                                        </div>
                                        <div className="change-color-icon">
                                            <HiOutlineColorSwatch size={28} onClick={() => {
                                                const data = JSON.parse(localStorage.getItem('todos'));
                                                changeColor(todo.id, data);
                                                localStorage.setItem('todos', JSON.stringify(data));

                                                console.log("data after pressing change color: ", data);
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Draggable >
                    </div >
                )}
            </div>
        );
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

                            <div className="todo-text" key={todo.id} onClick={() => {

                                completeTodo(todo.id, completeTxt = filterText(todo.text));

                            }}>
                                {todo.text}
                            </div>
                            <div className="icons">
                                <div className='delete-icon'>
                                    <RiDeleteBinLine size={28} onClick={() => {
                                        removeTodo(todo.id, removeItem = filterText(todo.text))
                                    }}

                                    />
                                </div>
                                <div className="edit-icon">
                                    <FaRegEdit size={28} onClick={() => {
                                        const data = JSON.parse(localStorage.getItem('todos'));
                                        localStorage.setItem('todos', JSON.stringify(data));
                                        setEdit({ id: todo.id, value: filterText(todo.text) });
                                        updateItem = filterText(todo.text);
                                        console.log("data after pressing edit is: ", data);
                                    }} />
                                </div>
                                <div className="change-color-icon">
                                    <HiOutlineColorSwatch size={28} onClick={() => {
                                        const data = JSON.parse(localStorage.getItem('todos'));
                                        localStorage.setItem('todos', JSON.stringify(data));
                                        changeColor(todo.id, data);

                                        console.log("data after pressing change color: ", data);
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
import React, { useState, useRef } from 'react'
import TodoForm from './TodoForm'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { Draggable } from 'react-beautiful-dnd';

export let removeItem;
export let completeTxt;
export let updateItem;
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

    let [currentColor, setCurrentColor] = useState('white');
    // const [bg, changeBGColor] = React.useState(1);

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })
    // const componentRef = React.useRef();
    const rowRef = React.useRef(null);

    const getItemStyle = (isDragging, draggableStyle, index) => ({
        // basic styles to make the items look a bit nicer
        userSelect: "none",
        width: "100%",
        padding: "5px",

        //if id matches ref id, change color of element that matches the id

        // change background colour if dragging
        background: isDragging ? "lightgreen" : currentColor,
        boxShadow: isDragging ? "0 0 .4 rem #666" : "none",
        // styles we need to apply on draggables
        ...draggableStyle
    });

    const changeColor = (index, provided) => {
        let element = document.getElementById(index);
        // console.log(currentColor);
        // console.log(element.backgroundColor);
        if (element.style.backgroundColor === 'white') {
            // setCurrentColor('blue');
            return element.style.backgroundColor = "lightblue";
        }
        if (element.style.backgroundColor === 'lightblue') {
            return element.style.backgroundColor = "lightcoral";
        }
        if (element.style.backgroundColor === 'lightcoral') {
            return element.style.backgroundColor = "rgb(142, 252, 142)";
        }
        if (element.style.backgroundColor === 'rgb(142, 252, 142)') {
            return element.style.backgroundColor = "white";
        }

    }

    const submitUpdate = value => {
        let prevValue = updateItem;
        updateTodo(edit.id, value, prevValue)
        // console.log("AMAMAMAM:", prevValue);
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
                        <div id={index} className="list-item" ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                index
                                // currentClr
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
                                    <HiOutlineColorSwatch size={28} onClick={() => { changeColor(index, provided) }} />
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
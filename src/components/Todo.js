import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FaRegEdit } from "react-icons/fa";

import { Draggable } from 'react-beautiful-dnd';

let btnType;
export let removeItem;
export let completeTxt;
export let updateTxt;
// function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const getItemStyle = (isDragging, draggableStyle) => ({
    // basic styles to make the items look a bit nicer
    userSelect: "none",
    width: "100%",
    padding: "5px",


    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",
    boxShadow: isDragging ? "0 0 .4 rem #666" : "none",
    // styles we need to apply on draggables
    ...draggableStyle
});

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })


    const submitUpdate = value => {
        let prevValue = updateTxt;
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
            <div key={todo.id} className={todo.isComplete ? 'todo-row complete' : 'todo-row'} >
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided, snapshot) => (
                        <div className="list-item" ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(

                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>

                            <div className="todo-text" key={todo.id} onClick={() => completeTodo(todo.id, completeTxt = todo.text)}>
                                {todo.text}
                            </div>
                            <div className="icons">
                                <div className='delete-icon'>
                                    <RiDeleteBinLine size={28} onClick={() => removeTodo(todo.id, removeItem = todo.text)}

                                    />
                                </div>
                                <div className="edit-icon">
                                    <FaRegEdit size={28} onClick={() => {
                                        setEdit({ id: todo.id, value: todo.text });
                                        updateTxt = todo.text;

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
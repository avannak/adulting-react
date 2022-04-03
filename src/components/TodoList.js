import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo, { filterText } from './Todo';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import adulting from './assets/gifs/adulting-demo.gif';
import { RiInformationLine } from 'react-icons/ri'

let taskItem;
let btnType;
let updatedMsg;
let newMsg;

function TodoList() {

    const [stateToggled, setStatusState] = useState(false);
    const [dragNotifToggled, setDragNotifState] = useState(false);
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
    useEffect(() => {
        // localstorage only support storing strings as keys and values
        // - therefore we cannot store arrays and objects without converting the object
        // into a string first. JSON.stringify will convert the object into a JSON string
        // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
        localStorage.setItem("todos", JSON.stringify(todos));
        // add the todos as a dependancy because we want to update the
        // localstorage anytime the todos state changes
    }, [todos]);


    const changeStatus = (message, buttonType) => {
        const setStateToFalse = () => {
            setStatusState(false);
        }
        taskItem = message;
        btnType = buttonType;
        // getStatusMsg(message, buttonType);
        setStatusState(true);
        // console.log("setStatusState is: ", stateToggled);
        if (!stateToggled) {
            setTimeout(function () { setStateToFalse(); }, 5000);
        }
        // console.log("setStatusState is: ", stateToggled);
    }
    const addTodo = todo => {
        // if empty string, do not add string to list.
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        taskItem = filterText(todo.text);
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
    }

    const updateTodo = (todoId, newValue, prevValue) => {
        updatedMsg = filterText(prevValue);
        newMsg = filterText(newValue.text);
        if (!newValue.text || /^\s*$/.test(newValue.text) || updatedMsg === newMsg) {
            return;
        }
        changeStatus(updatedMsg, "updateTodo");
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        taskItem = newValue;
    }
    const completeTodo = (id, text) => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }
    const removeTodo = (id, text) => {
        taskItem = filterText(text);
        changeStatus(text, "removeTodo");
        const removeArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removeArr);
    }
    const getDraggableNotif = () => {
        setDragNotifState(true);
        if (!dragNotifToggled) {
            setTimeout(function () { setDragNotifState(false); }, 6000);
        }
    }
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
            <div className={dragNotifToggled ? "drag-notification active" : "drag-notification inactive"}>
                <img draggable="false" className="animated-gif" src={adulting} alt="This will display an animated GIF" />
                Hold and drag to re-arrange tasks!</div>
            <h1 className={stateToggled ? "list-status active" : "list-status inactive"}>{getStatusMsg(taskItem, btnType)}</h1>
            <DragDropContext onDragEnd={(param) => {
                const srcI = param.source.index;
                const desI = param.destination.index;
                todos.splice(desI, 0, todos.splice(srcI, 1)[0]);
                localStorage.setItem("todos", JSON.stringify(todos));
                // console.log(param);
            }}>
                <Droppable droppableId="droppable-1">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div >
    );
}

export default TodoList;
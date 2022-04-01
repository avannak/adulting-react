import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


function TodoList() {
    let taskMsg;
    let updatedMsg;
    let newMsg;
    let btnType;
    const [stateToggled, setStatusState] = useState(false);
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

    const changeStatus = () => {
        setStatusState(true);
        setTimeout(function () {
            setStatusState(false);
        }.bind(stateToggled), 1500);
    }
    const addTodo = todo => {
        btnType = addTodo.name;
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        taskMsg = todo.text;
        changeStatus();
        console.log(todo, ...todos);
    };

    const getStatusMsg = (message, buttonType) => {
        let taskMsg = message;
        if (buttonType === "removeTodo") {
            return `removed "${taskMsg}" from the list`;
        }
        if (buttonType === "addTodo") {
            return `added "${taskMsg}" to the list`;
        }
        if (buttonType === "updateTodo") {
            return `updated "${updatedMsg}" to "${newMsg}"`;
        }
        return `added "${taskMsg}" to the list`;
    }

    const updateTodo = (todoId, newValue, prevValue) => {
        updatedMsg = prevValue;
        newMsg = newValue.text;
        btnType = updateTodo.name;
        changeStatus();
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        taskMsg = newValue;
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

        console.log("text is: ", text);
        taskMsg = text;
        btnType = removeTodo.name;
        changeStatus();
        const removeArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removeArr);
    }
    // "list-status active"
    return (

        <div>
            <h1>What is today's plan?</h1>
            <TodoForm onSubmit={addTodo} />
            <h1 className={stateToggled ? "list-status active" : "list-status inactive"}>{getStatusMsg(taskMsg, btnType)}</h1>
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
        </div>
    );
}

export default TodoList;
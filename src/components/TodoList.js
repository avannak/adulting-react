import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        console.log(todo, ...todos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }
    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removeArr);
    }

    return (
        <div>
            <h1>What is today's plan?</h1>
            <TodoForm onSubmit={addTodo} />

            <DragDropContext onDragEnd={(param) => {
                const srcI = param.source.index;
                const desI = param.destination.index;
                todos.splice(desI, 0, todos.splice(srcI, 1)[0]);
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
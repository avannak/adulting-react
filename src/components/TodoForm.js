import React, { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            id: v4(),
            text: input,
        });

        setInput('');
    };
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
                <React.Fragment>
                    <input
                        type="text"
                        value={input}
                        placeholder="update your task"
                        name="text"
                        className="todo-input edit"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className="todo-button edit">Update</button>
                </React.Fragment>) :
                (
                    <React.Fragment>
                        <input
                            type="text"
                            value={input}
                            placeholder="enter a task"
                            name="text"
                            className="todo-input"
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button className="todo-button">Add Task</button>
                    </React.Fragment>)
            }

        </form>

    );
}

export default TodoForm;

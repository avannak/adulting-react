import React, { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";

function TodoForm(props) {

    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const [counterStateToggled, setCounterState] = useState(false);

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
        if (input === '') {
            setCounterState(false);
        }
    }, [input])

    const handleChange = (e) => {
        setCounterState(true);
        setInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            id: v4(),
            text: input,
            colors: 'white',
        });
        const data = JSON.parse(localStorage.getItem('todos'));
        localStorage.setItem('todos', JSON.stringify(data));
        console.log("dattta", data)
        // const data = JSON.parse(localStorage.getItem('todos'));
        setCounterState(false);
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
                        maxLength={100}
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
                            maxLength={100}
                        />
                        <button className="todo-button">Add Task</button>
                    </React.Fragment>)
            }
            <div style={{ color: "white" }} className={counterStateToggled ? "word-counter active" : "word-counter inactive"}>{100 - input.length} characters left</div>
        </form>

    );
}

export default TodoForm;

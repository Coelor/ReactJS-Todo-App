import React, { useEffect, useState } from "react";
import TodoItem from './TodoItem';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    function addTask(text) {
        if (text.trim() === '') return;

        const newTask = {
            id: Date.now(),
            text,
            completed: false,
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setText('');
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function toggleCompleted(id) {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed};
            } else {
                return task;
            }
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    return (
        <div className="Todo-List">
            <div className="Todo-List-Items">
                {tasks.map(task => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted}
                    />
                ))}
            </div>
            <div className="Todo-List-Input">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="New task"
                />
                <button onClick={() => addTask(text)}>Add</button>
            </div>
        </div>
    );
}

export default TodoList;
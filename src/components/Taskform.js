import React, { useState } from 'react';

export default function TaskForm({addTask}) {

    const [newTaskTitle, setNewTaskTitle] = useState('');

    //Handle Task Input change Event
    const handleTaskInput = (event) => {
        setNewTaskTitle(event.target.value);
    }

    //Handle Task Form submit Event
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!newTaskTitle) {
            return;
        } else {
            addTask(newTaskTitle);//callback Function
            setNewTaskTitle('');
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input className='TaskInput'
                   type="text"
                   value={newTaskTitle} 
                   placeholder="Enter your task here..."
                   onChange={handleTaskInput}/>
            <button className="TaskAddButton" type="submit">+</button>
        </form>
        </>
    );
}
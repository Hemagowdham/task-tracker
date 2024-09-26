/**
 * Todo.js
 * Entry point for Todo React Application
 */

import React, { useState } from 'react';
import TaskForm from './Taskform';

//Functional component to display tast details
function TaskDetails({task, doneTask}) {

    //Handling Task complete/undo button onClick event
    function handleTaskComplete() {
        console.log("handleTaskComplete() called");
        doneTask(task.id);//callback function
    }

    return(
        <>
        <div className='TaskItem' style={{borderStyle: 'solid', borderColor: task.done? '#509875': '#764abc'}}>
            <div className='TaskName' style={{textDecoration: task.done? 'line-through': 'none', color: task.done? '#B4B8C8': 'black'}}>
                {task.title}
            </div>
            <button className='TaskStatus' style={{backgroundColor: task.done? '#509875': '#764abc'}} onClick={handleTaskComplete}>{task.done? 'Undo': 'Done'}</button>
        </div>
        </>
    );
}

export default function Todo() {

    const existingTasks = [{id: 1, title: 'Do your workout', done: true},
                           {id: 2, title: 'Send Documents to xyz company', done: false},
                           {id: 3, title: 'Prepare Fruit salad for Breakfast', done: false}];

    //useState Hooks - For taskslist state management
    const [tasks, setTasks] = useState(existingTasks);

    //Callback Function - For adding new task when task form is submitted with a task
    const addTask = (newTaskTitle) => {
        let newId = tasks.length + 1;
        const newTasks = [...tasks, {id: newId, title: newTaskTitle, done: false}];
        setTasks(newTasks);
        console.log(tasks);
    }

    //Callback Function - For handling task completed/not completed status
    const doneTask = (id) => {
        console.log("donetask() Callback called");
        const updateTasks = [...tasks];
        updateTasks[id-1].done = !updateTasks[id-1].done;
        setTasks(updateTasks);
        console.log(updateTasks);
    }

    return(
        <>
        <div className="TodoAppContainer">
            <h4>ToDo App</h4>
            <div className="TaskForm">
                <TaskForm addTask={addTask}/>
            </div>

            <div className="TaskItemContainer">
                {tasks.map((task, index)=><TaskDetails task={task} doneTask={doneTask}/>)}
            </div>
        </div>
        </>
    );
}

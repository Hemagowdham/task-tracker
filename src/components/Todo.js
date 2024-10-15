/**
 * Todo.js
 * Entry point for Todo React Application
 */

import React, { useState, useEffect } from 'react';
import TaskForm from './Taskform';

//Functional component to display tast details
function TaskDetails({task, doneTask, deleteTask}) {

    //Handling Task complete/undo button onClick event
    function handleTaskComplete() {
        console.log("handleTaskComplete() called");
        doneTask(task.id);//callback function
    }

    function handleTaskDelete() {
        console.log("handleTaskDelete() called");
        deleteTask(task.id);//callback function
    }

    return(
        <>
        <div className='TaskItem' style={{borderStyle: 'solid', borderColor: task.done? '#509875': '#764abc'}}>
            <div className='TaskName' style={{textDecoration: task.done? 'line-through': 'none', color: task.done? '#B4B8C8': 'black'}}>
                {task.title}
            </div>
            <button className='TaskStatus' style={{backgroundColor: task.done? '#509875': '#764abc'}} onClick={handleTaskComplete}>{task.done? 'Undo': 'Done'}</button>
            <button className='TaskDelete' style={{marginLeft: '10px'}} onClick={handleTaskDelete}>x</button>
        </div>
        </>
    );
}

export default function Todo() {

    //useState and useEffect Hooks - For monitoring number of remaining tasks
    const [remainingTasks, setRemainingTasks] = useState(0);

    const existingTasks = [{id: 1, title: 'Do your workout', done: true},
                           {id: 2, title: 'Send Documents to xyz company', done: false},
                           {id: 3, title: 'Prepare Fruit salad for Breakfast', done: false}];

    //useState Hooks - For taskslist state management
    const [tasks, setTasks] = useState(existingTasks);

    //useEffect Hooks - Infinite rendering
    //Monitor tasks that are not deleted, (i.e)Remaining tasks
    useEffect(() => { 
        setRemainingTasks(tasks.filter(task => !task.completed).length);
        console.log("Remaining tasks", remainingTasks);
    });

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
        let taskIndex = tasks.findIndex((task)=>task.id === id);
        console.log("Done: TaskIndex-", taskIndex);
        const updateTasks = [...tasks];
        updateTasks[taskIndex].done = !updateTasks[taskIndex].done;
        setTasks(updateTasks);
        console.log(updateTasks);
    }

    //callback Function - For handing task delete
    const deleteTask = (id) => {
        console.log("deleteTask() callback called");
        let taskIndex = tasks.findIndex((task)=>task.id === id);
        console.log("Delete: TaskIndex-",taskIndex);
        const newTasks = [...tasks];
        newTasks.splice((taskIndex), 1);
        console.log(newTasks);
        setTasks(newTasks);
    }

    return(
        <>
        <div className="TodoAppContainer">
            <h4>ToDo App</h4>
            <div className="TaskForm">
                <TaskForm addTask={addTask}/>
            </div>

            <div className="TaskItemContainer">
                {tasks.map((task, index)=><TaskDetails task={task} doneTask={doneTask} deleteTask={deleteTask}/>)}
            </div>
        </div>
        </>
    );
}

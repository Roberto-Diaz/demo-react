import React,{ useState } from "react";

export const TaskCreator = props => {

    const [newTaskName, setNewTaskName] = useState('');
    const updateNewTaskValue = e => setNewTaskName(e.target.value);

    const createNewTask = () => {
        props.callback(newTaskName);
        setNewTaskName('');
    }

    return (
        <div className="taskcreator">
            <input 
                type="text" 
                className="form-control"
                value={newTaskName}
                onChange={updateNewTaskValue}
            />
            <button type="button" onClick={createNewTask}>Add</button>
        </div>
    );
}
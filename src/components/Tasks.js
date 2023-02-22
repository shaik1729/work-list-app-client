import React, { useState, useEffect } from 'react';

import UpdateTask from './UpdateTask'

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isUpdateShown, setUpdateShown] = useState(false);
    const [updatingTask, setUpdatingTask] = useState({});

    useEffect(() => {
        fetch('https://63f45ed32213ed989c414b54.mockapi.io/tasks')
        .then(response => response.json())
        .then(data => setTasks(data))
    }, []);

    const handleUpdateTask = (e, task) => {
        e.preventDefault();
        // console.log(task);
        setUpdateShown(true); 
        setUpdatingTask(task);
    }

    const TableData = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={ task.id }>
                            <td>{ task.id }</td>
                            <td>{ task.title }</td>
                            <td>{ task.description }</td>
                            <td>{ task.deadline }</td>
                            <td>{ task.createdAt }</td>
                            <td>{ task.isCompleted ? "Completed" : "Pending" }</td>
                            <td><span className='btn btn-primary' onClick={(e)=> handleUpdateTask(e,task)}>Update</span></td>
                        </tr>    
                    ))}
                </tbody>
            </table>
        )
    }


    return (
        <div>
            {isUpdateShown ? <UpdateTask task={updatingTask} /> : <TableData />}

                    
        </div>
    );
};

export default Tasks;

import React, { useState, useEffect } from 'react';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        fetch('https://63f45ed32213ed989c414b54.mockapi.io/tasks')
        .then(response => response.json())
        .then(data => setTasks(data))
    }, []);

    return (
        <div>
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
                        </tr>    
                    ))}
                </tbody>
            </table>
                    
        </div>
    );
};

export default Tasks;

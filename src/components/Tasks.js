import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('https://63f45ed32213ed989c414b54.mockapi.io/tasks')
        .then(response => response.json())
        .then(data => setTasks(data))
    }, []);


    const handleDeleteTask = async (e, id) => {
        console.log("in delete", id)
        await fetch(`https://63f45ed32213ed989c414b54.mockapi.io/tasks/${id}`, {
            method: 'DELETE',
            }).then(res => {
            if (res.ok) {
                alert("Task Deleted");
                window.location.reload(false);
            }
            }).catch(error => {
                alert("Something went wrong");
                console.log(error);
            })

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
                            <td> <Link to={`/task/${task.id}/edit`} className='btn btn-info'>update</Link></td>
                            <td><span className='btn btn-danger' onClick={(e)=> handleDeleteTask(e, task.id)}>Delete</span></td>
                        </tr>    
                    ))}
                </tbody>
            </table>
        )
    }


    return (
        <div>
            <TableData />    
        </div>
    );
};

export default Tasks;

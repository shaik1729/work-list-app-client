import React from 'react'

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {

    const { id } = useParams();

    const [task, setTask] = useState({});

    const navigater = useNavigate();


    useEffect(()=> {
        fetch(`https://63f45ed32213ed989c414b54.mockapi.io/tasks/${id}`)
        .then(response => response.json())
        .then(data => setTask(data))
    }, [])
   

    const handleOnChange = (e) => {
        const { name, value, type } = e.target;

        if(type === 'checkbox') {
            setTask((prevTask) => {
                return { ...prevTask, [name]: e.target.checked }
            });
        }else{
            setTask((prevTask) => {
                return { ...prevTask, [name]: value }
            });
        }

    }

    const taskUpdate = async (e) => {
        
        const data = {
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            isCompleted: task.isCompleted
        }

        await fetch(`https://63f45ed32213ed989c414b54.mockapi.io/tasks/${id}`, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            // Send your data in the request body as JSON
            body: JSON.stringify(data)
            }).then(res => {
            if (res.ok) {
                console.log("Task Updated");
            }
            }).catch(error => {
                console.log(error);
            })
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        taskUpdate();
        navigater('/tasks');
    }

    return (
        <>
        <div className="container mt-2">
        <h1>Update Task</h1>
            <form onSubmit={(e) => handleUpdate(e) }>
                <div className="mb-3">
                    <label htmlFor="title" className="from-label">Title</label>
                    <input type="text" id="title" className="form-control" name="title" onChange={handleOnChange} value={task.title || ""}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="from-label">Description</label>
                    <textarea id="description" className="form-control" name="description" onChange={handleOnChange} value={task.description || ""} />
                </div>
                <div className="mb-3">
                    <label htmlFor="deadline" className="from-label">Deadline</label>
                    <input type="date" id="deadline" className="form-control" name="deadline" onChange={handleOnChange} value={task.deadline || ""}  />
                </div>
                <div className="mb-3">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0 me-3" type="checkbox" name="isCompleted" aria-label="Checkbox for following text input" onChange={handleOnChange} checked={task.isCompleted || false} />
                        <label htmlFor="deadline" className="from-label">Completed?</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
    )
}

export default UpdateTask;
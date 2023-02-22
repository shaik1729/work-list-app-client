import React from 'react'

import { useState } from "react";


const AddTask = (props) => {

    const [title, setTitle] = useState(props.task.title);
    const [description, setDescription] = useState(props.task.description);
    const [deadline, setDeadline] = useState(props.task.deadline);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { title, description, deadline, isCompleted };
        console.log(data)

        await fetch('https://63f45ed32213ed989c414b54.mockapi.io/tasks/'+`${props.task.id}`, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            // Send your data in the request body as JSON
            body: JSON.stringify(data)
            }).then(res => {
            if (res.ok) {
                alert("Task Updated");
                window.location.reload(false);
            }
            }).catch(error => {
                alert("Something went wrong");
                console.log(error);
            })
    };

    return (
        <>
        <div className="container mt-2">
        <h1>Update Task</h1>
            <form onSubmit={(e) => handleSubmit(e) }>
                <div className="mb-3">
                    <label htmlFor="title" className="from-label">Title</label>
                    <input type="text" id="title" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="from-label">Description</label>
                    <textarea id="description" className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="deadline" className="from-label">Deadline</label>
                    <input type="date" id="deadline" className="form-control" onChange={(e) => setDeadline(e.target.value)} value={deadline} />
                </div>
                <div className="mb-3">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0 me-3" type="checkbox" value="false" aria-label="Checkbox for following text input" onClick={(e) => setIsCompleted(true)}  />
                        <label htmlFor="deadline" className="from-label">Completed?</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
    )
}

export default AddTask;
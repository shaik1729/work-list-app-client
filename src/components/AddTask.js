import React from "react";
import { useState } from "react";


const AddTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { title, description, deadline, isCompleted: false, createdAt: new Date().toDateString() };

        await fetch('https://63f45ed32213ed989c414b54.mockapi.io/tasks', {
            method: 'POST',
            headers: {'content-type':'application/json'},
            // Send your data in the request body as JSON
            body: JSON.stringify(data)
            }).then(res => {
            if (res.ok) {
                alert("Task Added");
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
            <h1>Add Task</h1>
                <form onSubmit={(e) => handleSubmit(e) }>
                    <div className="mb-3">
                        <label htmlFor="title" className="from-label">Title</label>
                        <input type="text" id="title" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="from-label">Description</label>
                        <textarea id="description" className="form-control" onChange={(e) => setDescription(e.target.value) } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline" className="from-label">Deadline</label>
                        <input type="date" id="deadline" className="form-control" onChange={(e) => setDeadline(e.target.value) } />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );

};

export default AddTask;
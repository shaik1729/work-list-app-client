import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

var qs = require('qs');


const AddTask = () => {

    const api_base_url = 'http://localhost:3000/api/v1/tasks';

    const navigater = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        var data = qs.stringify({
            'title': title,
            'description': description
        });

        var config = {
            method: 'post',
            url: api_base_url,
            headers: { 
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWlrdGFqIiwidXNlcmlkIjo5LCJpYXQiOjE2Nzc1NTg2OTEsImV4cCI6MTY3NzU2MjI5MX0._WKRMMuOAy7A2ZCBLtj9sAWpk9QGoILHL7bD6rWclN4', 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            navigater("/tasks");
        })
        .catch(function (error) {
            console.log(error);
        });

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
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );

};

export default AddTask;
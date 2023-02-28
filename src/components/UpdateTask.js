import React from 'react'

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
var qs = require('qs');

const api_base_url = 'http://localhost:3000/api/v1/tasks'


const UpdateTask = () => {

    const { id } = useParams();


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const navigater = useNavigate();


    useEffect(()=> {
        getTasks();
    }, [])

    
    const getTasks = () => {

        var config = {
          method: 'get',
          url: `${api_base_url}/${id}`,
          headers: { 
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWlrdGFqIiwidXNlcmlkIjo5LCJpYXQiOjE2Nzc1NjMwNzUsImV4cCI6MTY3NzU2NjY3NX0._9XD9-NCsphGCSEO6jY1G171GLmM-rBWa8UEI2j7k8k'
          }
        };
        
        axios(config)
        .then(function (response) {
            setTitle(response.data.data.title);
            setDescription(response.data.data.description);
        })
        .catch(function (error) {
          console.log(error);
        });
                
    }


    const taskUpdate = (e) => {
        
        var data = qs.stringify({
            'title': title,
            'description': description 
        });

        var config = {
            method: 'put',
            url: `${api_base_url}/${id}`,
            headers: { 
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWlrdGFqIiwidXNlcmlkIjo5LCJpYXQiOjE2Nzc1NjMwNzUsImV4cCI6MTY3NzU2NjY3NX0._9XD9-NCsphGCSEO6jY1G171GLmM-rBWa8UEI2j7k8k', 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

       
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
                    <input type="text" id="title" className="form-control" name="title" onChange={(e) => setTitle(e.target.value)} value={title}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="from-label">Description</label>
                    <textarea id="description" className="form-control" name="description" onChange={(e) => setDescription(e.target.value)} value={description}  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
    )
}

export default UpdateTask;
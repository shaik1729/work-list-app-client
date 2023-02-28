import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Tasks = () => {

    const api_base_url = 'http://localhost:3000/api/v1/tasks'

    const [tasks, setTasks] = useState([]);
    
    const getTasks = () => {

        var config = {
          method: 'get',
          url: api_base_url,
          headers: { 
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkIiwidXNlcmlkIjoyLCJpYXQiOjE2NzczODc0MTB9.zNgyky8Ly9EuLPJloi9O-8Ok5MEWwJcLOcmHqIoPazw'
          }
        };
        
        axios(config)
        .then(function (response) {
          setTasks(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
                
    }
    
    useEffect(() => {
        getTasks()
    }, []);




    const handleDeleteTask = (e, id) => {
        console.log("in delete", id);

        var config = {
            method: 'delete',
            url: `${api_base_url}/${id}`,
            headers: { 
              'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWlrdGFqIiwidXNlcmlkIjo5LCJpYXQiOjE2Nzc1NjMwNzUsImV4cCI6MTY3NzU2NjY3NX0._9XD9-NCsphGCSEO6jY1G171GLmM-rBWa8UEI2j7k8k'
            }
            
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            getTasks();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const TableData = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={ task.id }>
                            <td>{ task.id }</td>
                            <td>{ task.title }</td>
                            <td>{ task.description }</td>
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

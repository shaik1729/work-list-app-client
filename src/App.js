import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

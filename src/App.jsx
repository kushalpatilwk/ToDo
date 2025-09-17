//import { TaskProvider } from './context/TaskContext';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
//import React, { useEffect } from 'react';
//import { useState } from 'react';
import './App.css';

const App = () => {



  return (
   
      <div className="app-container">
        <h1 className="header-title"><b>To_Do_List</b></h1>
        <TaskInput />
        <TaskList />
      </div>
    
  );

}

export default App;

import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [task, setTask] = useState({ text: "", checked: false });
  const [tasks, setTasks] = useState([]);

  // useEffect(()=>{
  //            console.log(tasks);
  //         },[tasks])

  const sortedTasks = tasks.slice().sort((a, b) => a.checked - b.checked);

  return (
    <div className="app-container">
      <h1 className="header-title"><b>To_Do_List</b></h1>
      <form className="task-form">
        <input
          type="text"
          value={task.text}
          onChange={(e) => setTask({ ...task, text: e.target.value })}
          className="task-input"
          placeholder="Enter a task..."
        />
        <button
          type="submit"
          className="add-button"
          onClick={(e) => {
            e.preventDefault();
            if (task.text.trim() === "") return;
            const newTask = { ...task, id: Date.now() };
            setTasks([...tasks, newTask]);
            setTask({ text: " ", checked: false });
          }}
        >
          Add Task
        </button>
      </form>

      {sortedTasks.map((task, index) =>
        <div key={task.id} className="task-item">
          <ul>
            <li className={task.checked ? "checked" : ""}>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={(e) => {
                  const newTasks = [...tasks];
                  const idd = tasks.findIndex(t => t.id === task.id);
                  newTasks[idd].checked = e.target.checked;
                  setTasks(newTasks);
                }}
              />
              {task.text}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

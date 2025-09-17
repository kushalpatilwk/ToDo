import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState({ text: "", checked: false });
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task.text.trim() === "") return;
        const newTask = { ...task, id: Date.now() };
        setTasks([...tasks, newTask]);
        setTask({ text: "", checked: false });
    }

    const toggleTaskChecked = (id, checked) => {
        const newTasks = tasks.map(t => t.id === id ? { ...t, checked } : t);
        setTasks(newTasks);
    }

    return (
        <TaskContext.Provider
            value={{
                task,
                setTask,
                tasks,
                addTask,
                toggleTaskChecked,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}
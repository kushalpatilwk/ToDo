// import { useContext } from "react";
// import { TaskContext } from "../context/TaskContext";
import useTaskStore from "../context/useTaskStore";
//import './App.css';

const TaskList = () => {
    //const { tasks, toggleTaskChecked } = useContext(TaskContext);
    const tasks = useTaskStore(state=> state.tasks );
    const toggleTaskChecked = useTaskStore(state=> state.toggleTaskChecked );
    const sortedTasks = tasks.slice().sort((a, b) => a.checked - b.checked);

    return (
        <div className="task-list">{
            sortedTasks.map(task => (
                <div key={task.id} className="task-item">
                    <ul>
                        <li className={task.checked ? "checked" : ""}>
                            <input
                                type="checkbox"
                                checked={task.checked}
                                onChange={e => toggleTaskChecked(task.id, e.target.checked)}
                            />
                            {task.text}
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
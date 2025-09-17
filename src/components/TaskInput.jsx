import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
//import '../app.css';

const TaskInput = () => {
    const { task, setTask, addTask } = useContext(TaskContext);

    return (<form className="task-form">
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
            onClick={e => {
                e.preventDefault();
                addTask();
            }}
        >
            Add Task
        </button>
    </form>);
};

export default TaskInput;
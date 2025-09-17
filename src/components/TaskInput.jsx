// import { useContext } from "react";
// import { TaskContext } from "../context/TaskContext";
import useTaskStore from "../context/useTaskStore";
//import '../app.css';

const TaskInput = () => {
    //const { task, setTask, addTask } = useContext(TaskContext);
    const task = useTaskStore(state => state.task);
    const setTask = useTaskStore(state => state.setTask);
    const addTask = useTaskStore(state => state.addTask);
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
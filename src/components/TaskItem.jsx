import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useTaskStore from "../context/useTaskStore";

const TaskItem = ({ task }) => {
  const toggleTaskChecked = useTaskStore(state => state.toggleTaskChecked);
  const taskUpdate = useTaskStore(state => state.taskUpdate);
  const taskDelete = useTaskStore(state => state.taskDelete);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="task-item"
    >
      <div className={`${task.checked ? "checked" : ""}`}>
        <input 
          type="checkbox"
          checked={task.checked}
          onChange={e => toggleTaskChecked(task.id, e.target.checked)}
        />
        {task.text}
      </div>

      <div className="task-form">
        <button
          className="add-button"
          onClick={e => { e.preventDefault(); taskUpdate(task.id, task.text); }}
        >
          Update
        </button>

        <button
          className="add-button"
          onClick={e => { e.preventDefault(); taskDelete(task.id); }}
        >
          Delete
        </button>
      </div>  
    </li>
  );
};

export default TaskItem;

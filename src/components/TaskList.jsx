import React from "react";
import useTaskStore from "../context/useTaskStore";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const tasks = useTaskStore(state => state.tasks);
  const setTasks = useTaskStore(state => state.setTasks);

  const sortedTasks = tasks
    .slice()
    .sort((a, b) => a.checked - b.checked || a.order - b.order);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortedTasks.findIndex(task => task.id === active.id);
    const newIndex = sortedTasks.findIndex(task => task.id === over.id);

    const reordered = arrayMove(sortedTasks, oldIndex, newIndex);

    const updatedTasks = reordered.map((task, index) => ({
      ...task,
      order: index,
    }));

    setTasks(updatedTasks);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sortedTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
       
          {sortedTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;

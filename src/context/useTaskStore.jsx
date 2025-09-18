import { create } from 'zustand';

const useTaskStore = create((set) => ({
  task: { text: "", checked: false },
  tasks: [],

  addTask: () =>
    set((state) => {
      if (state.task.text.trim() === "") return {};

      const newTask = {
        ...state.task,
        id: Date.now(),
        checked: false,
        order: state.tasks.length,   // ✅ always set order
      };

      const unchecked = [newTask, ...state.tasks.filter((t) => !t.checked)];
      const checkedList = state.tasks.filter((t) => t.checked);

      const updatedTasks = [
        ...unchecked.map((t, i) => ({ ...t, order: i })),
        ...checkedList.map((t, i) => ({ ...t, order: unchecked.length + i })),
      ];

      return {
        tasks: updatedTasks,
        task: { text: "", checked: false },
      };
    }),

  toggleTaskChecked: (id, checked) =>
    set((state) => {
      let updatedTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, checked } : t
      );

      const unchecked = updatedTasks.filter((t) => !t.checked);
      const checkedList = updatedTasks.filter((t) => t.checked);

      updatedTasks = [
        ...unchecked.map((t, i) => ({ ...t, order: i })),
        ...checkedList.map((t, i) => ({ ...t, order: unchecked.length + i })),
      ];

      return { tasks: updatedTasks };
    }),

  setTask: (task) => set({ task }),

  taskUpdate: (id, text) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? { ...t, text: prompt("update task", t.text) || text }
          : t
      ),
    })),

  taskDelete: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  setTasks: (newTasks) => set({ tasks: newTasks }),
}));

export default useTaskStore;

import { create } from 'zustand';

const useTaskStore = create((set) => ({
    task: { text: "", checked: false },
    tasks: [],

    addTask: () =>
        set((state) => {
            if (state.task.text.trim() === "") return {};
            const newTask = { ...state.task, id: Date.now() };
            return {
                tasks: [...state.tasks, newTask],
                task: { text: "", checked: false },
            };
        }),
    toggleTaskChecked: (id, checked) =>
        set((state) => ({
            tasks: state.tasks.map(t => t.id === id ? { ...t, checked } : t),
        })),
    setTask: (task) => set({ task }),
}));

export default useTaskStore;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  text: string;
  category: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

interface TasksState {
  items: Task[];
}

const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const initialState: TasksState = {
  items: loadTasksFromLocalStorage(),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        text: string;
        category: string;
        priority: Priority;
      }>
    ) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text: action.payload.text,
        category: action.payload.category || "Загальне",
        priority: action.payload.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    editTaskText: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const task = state.items.find((t) => t.id === action.payload.id);
      if (task && action.payload.text.trim()) {
        task.text = action.payload.text;
      }
    },
    clearCompletedTasks: (state) => {
      state.items = state.items.filter((task) => !task.completed);
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTaskStatus,
  editTaskText,
  clearCompletedTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
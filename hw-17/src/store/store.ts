import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import filtersReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("tasks", JSON.stringify(state.tasks.items));
  } catch (error) {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
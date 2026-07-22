import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setSearchQuery,
  setCategoryFilter,
  setPriorityFilter,
  setStatusFilter,
  resetFilters,
  type StatusFilter,
} from "../store/filtersSlice";
import { type Priority } from "../store/tasksSlice";

export const TaskFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const tasks = useAppSelector((state) => state.tasks.items);

  const categories = Array.from(
    new Set(tasks.map((t) => t.category).filter(Boolean))
  );

  return (
    <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Пошук завдань..."
          value={filters.searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="flex-1 px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
        />

        <select
          value={filters.status}
          onChange={(e) =>
            dispatch(setStatusFilter(e.target.value as StatusFilter))
          }
          className="px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
        >
          <option value="all">Усі статуси</option>
          <option value="active">Активні</option>
          <option value="completed">Виконані</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            dispatch(setPriorityFilter(e.target.value as "all" | Priority))
          }
          className="px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
        >
          <option value="all">Усі пріоритети</option>
          <option value="low">Низький пріоритет</option>
          <option value="medium">Середній пріоритет</option>
          <option value="high">Високий пріоритет</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className="px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
        >
          <option value="all">Усі категорії</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={() => dispatch(resetFilters())}
          className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 bg-zinc-200/50 hover:bg-zinc-200 rounded-xl active:scale-95 transition-all cursor-pointer"
        >
          Скинути
        </button>
      </div>
    </div>
  );
};
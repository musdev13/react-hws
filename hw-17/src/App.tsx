import { TaskForm } from "./components/TaskForm";
import { TaskFilters } from "./components/TaskFilters";
import { TaskStats } from "./components/TaskStats";
import { TaskList } from "./components/TaskList";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            Панель керування завданнями
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Організуйте свої справи швидко та зручно за допомогою Redux Toolkit
          </p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-200">
          <TaskForm />
          <TaskFilters />
          <TaskStats />
          <TaskList />
        </main>
      </div>
    </div>
  );
}
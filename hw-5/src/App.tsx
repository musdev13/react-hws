import type { Todo } from './types';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

const mockTodos: Todo[] = [
  {
    id: '1',
    text: 'Прибрати в кімнаті',
    completed: false,
    priority: 'low',
    date: '2026-06-20T12:00',
  },
  {
    id: '2',
    text: 'Підготуватися до лекції з React',
    completed: false,
    priority: 'high',
    date: '2026-06-16T18:00',
  },
  {
    id: '3',
    text: 'Здати домашнє завдання №4',
    completed: true,
    priority: 'normal',
    date: '2026-06-15T15:00',
  },
];

function App() {
  const totalCount = mockTodos.length;
  const completedCount = mockTodos.filter((todo) => todo.completed).length;

  return (
    <>
      <Header />
      <TaskForm />
      <Counter total={totalCount} completed={completedCount} />
      <TodoList todos={mockTodos} />
    </>
  );
}

export default App;
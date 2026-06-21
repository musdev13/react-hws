import type { Todo } from '../types';
import TodoItem from './TodoItem';
import styles from '../styles/TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
}

function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <p className={styles.emptyState}>Тут поки що порожньо 🌿</p>;
  }

  return (
    <div className={styles.todoContainer}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
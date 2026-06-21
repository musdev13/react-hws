import type { Todo } from '../types';
import styles from '../styles/TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const isOverdue = !todo.completed && todo.date && new Date(todo.date) < new Date();

  const formatDate = (iso: string | null): string => {
    if (!iso) return '';
    return new Date(iso).toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const priorityLabels: Record<Todo['priority'], string> = {
    low: '🟢 Низький',
    normal: '🟡 Нормальний',
    high: '🔴 Високий',
  };

  let itemClasses = `${styles.todoItem} ${styles[todo.priority]}`;
  if (todo.completed) itemClasses += ` ${styles.done}`;
  if (isOverdue) itemClasses += ` ${styles.overdue}`;

  return (
    <div className={itemClasses}>
      <input
        type="checkbox"
        className={styles.todoCheckbox}
        defaultChecked={todo.completed}
      />
      <div className={styles.todoBody}>
        <span className={styles.todoText}>{todo.text}</span>
        <div className={styles.todoMeta}>
          <span className={styles.todoPriority}>{priorityLabels[todo.priority]}</span>
          {todo.date && (
            <span className={`${styles.todoDue} ${isOverdue ? styles.todoDueOverdue : ''}`}>
              🕐 {formatDate(todo.date)}
              {isOverdue && ' — прострочено!'}
            </span>
          )}
        </div>
      </div>
      <button className={styles.deleteButton}>✕</button>
    </div>
  );
}

export default TodoItem;
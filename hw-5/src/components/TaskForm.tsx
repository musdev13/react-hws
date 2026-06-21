import { type FormEvent } from 'react';
import styles from '../styles/TaskForm.module.css';

function TaskForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.controls} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Що потрібно зробити?"
        autoComplete="off"
      />

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="todo-date">⏰ Дедлайн</label>
          <input type="datetime-local" className={styles.input} id="todo-date" />
        </div>

        <div className={styles.formField}>
          <label htmlFor="todo-priority">🎯 Пріоритет</label>
          <select id="todo-priority" className={styles.select} defaultValue="high">
            <option value="low">🟢 Низький</option>
            <option value="normal">🟡 Нормальний</option>
            <option value="high">🔴 Високий</option>
          </select>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={`${styles.btn} ${styles.btnAdd}`}>+ Додати</button>
        <button type="button" className={`${styles.btn} ${styles.btnSort}`}>↕ Сортувати</button>
      </div>
    </form>
  );
}

export default TaskForm;
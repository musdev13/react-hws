import styles from '../styles/Counter.module.css';

interface CounterProps {
  total: number;
  completed: number;
}

function Counter({ total, completed }: CounterProps) {
  return (
    <div className={styles.counter}>
      Завдань: <span className={styles.count}>{total}</span> &nbsp;·&nbsp; Виконано:{' '}
      <span className={styles.doneCount}>{completed}</span>
    </div>
  );
}

export default Counter;
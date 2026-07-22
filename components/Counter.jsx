"use client";

import { useState } from "react";
import styles from "./Counter.module.css";

export default function Counter({ inicialCount = 0 }) {
  const [count, setCount] = useState(inicialCount);

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function reset() {
    setCount(inicialCount);
  }

  return (
    <div className={styles.counter}>
      <p className={styles.label}>Client Component</p>
      <h2 className={styles.title}>Counter</h2>

      <p className={styles.value}>{count}</p>

      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={increment}>
          +
        </button>
        <button className={styles.resetButton} onClick={reset}>
          reset
        </button>
        <button className={styles.actionButton} onClick={decrement}>
          -
        </button>
      </div>
    </div>
  );
}

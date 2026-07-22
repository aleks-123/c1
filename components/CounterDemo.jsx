"use client";

import { useState } from "react";
import styles from "./CounterDemo.module.css";

function CounterDemo() {
  const [number, setNumber] = useState(0);
  console.log(number);

  function addOne() {
    setNumber(number + 1);
  }

  function addThree() {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }

  function addThreeFIX() {
    setNumber((preNumber) => preNumber + 1);
    setNumber((preNumber) => preNumber + 1);
    setNumber((preNumber) => preNumber + 1);
  }

  return (
    <section className={styles.demo}>
      <p className={styles.label}>State update demo</p>
      <h2 className={styles.number}>{number}</h2>
      <div className={styles.actions}>
        <button className={styles.button} onClick={addOne}>
          Add 1
        </button>
        <button className={styles.button} onClick={addThree}>
          Add 3
        </button>
        <button className={styles.button} onClick={addThreeFIX}>
          Add 3 fix
        </button>
      </div>
    </section>
  );
}

export default CounterDemo;

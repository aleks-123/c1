import styles from "./StudentCard.module.css";

export default function StudentCard({ student, onDeleteStudent }) {
  return (
    <article className={styles.card}>
      <div className={styles.studentInfo}>
        <h3>{student.name}</h3>
        <p className={styles.email}>{student.email}</p>
        <p className={styles.course}>{student.course}</p>
      </div>
      <div className={styles.actions}>
        <span className={styles.age}>{student.age} godini</span>
        <button className={styles.deleteButton} type="button" onClick={() => onDeleteStudent(student.id)}>
          Izbrishi
        </button>
      </div>
    </article>
  );
}

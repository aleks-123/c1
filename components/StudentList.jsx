import StudentCard from "./StudentCard";
import styles from "./StudentList.module.css";

export default function StudentList({ students, onDeleteStudent }) {
  return (
    <section className={styles.listSection}>
      <div className={styles.heading}>
        <h1>Studenti</h1>
        <p>Studenti na nekoj univerzitet</p>
      </div>

      {students.length === 0 ? (
        <p className={styles.emptyState}>Nema registrirani studenti, dodadi nov student preku nashata web forma</p>
      ) : (
        <div className={styles.studentGrid}>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} onDeleteStudent={onDeleteStudent} />
          ))}
        </div>
      )}
    </section>
  );
}

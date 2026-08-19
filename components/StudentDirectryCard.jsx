import Link from "next/link";
import styles from "./StudentDirectryCard.module.css";

export default function StudentDirectryCard({ student }) {
  return (
    <article className={styles.card}>
      <div className={styles.studentInfo}>
        <p className={styles.name}>{student.name}</p>
        <p className={styles.email}>{student.email}</p>
      </div>

      <Link className={styles.profileLink} href={`/students/${student.id}`}>
        Vidi profil
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

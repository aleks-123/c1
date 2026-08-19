import styles from "./StudentsDetails.module.css";

export default function StudentsDetails({ student }) {
  return (
    <article className={styles.card}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar} aria-hidden="true">
          {student.name.charAt(0)}
        </div>

        <div>
          <p className={styles.label}>Student profile</p>
          <h2>{student.name}</h2>
          <p className={styles.username}>@{student.username}</p>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detail}>
          <p className={styles.detailLabel}>Email</p>
          <p className={styles.detailValue}>{student.email}</p>
        </div>

        <div className={styles.detail}>
          <p className={styles.detailLabel}>Website</p>
          <p className={styles.detailValue}>{student.website}</p>
        </div>

        <div className={styles.detail}>
          <p className={styles.detailLabel}>Telefon</p>
          <p className={styles.detailValue}>{student.phone}</p>
        </div>

        <div className={styles.detail}>
          <p className={styles.detailLabel}>Grad</p>
          <p className={styles.detailValue}>{student.address.city}</p>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <p>
          Student ID <strong>#{student.id}</strong>
        </p>
        <p className={styles.company}>{student.company.name}</p>
      </div>
    </article>
  );
}

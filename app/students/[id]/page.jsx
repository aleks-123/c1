import StudentsDetails from "@/components/StudentsDetails";
import { getStudent } from "@/lib/students";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function StudentPage({ params }) {
  const { id } = await params;
  const student = await getStudent(id);

  if (!student) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.profile}>
        <Link className={styles.backLink} href="/students">
          <span aria-hidden="true">←</span>
          Nazad kon site studenti
        </Link>

        <div className={styles.intro}>
          <p className={styles.eyebrow}>Next.js · Dynamic Route</p>
          <h1>Student details</h1>
          <p>
            Prikaz na studentot so ID <strong>{id}</strong>
          </p>
        </div>

        <StudentsDetails student={student} />
      </section>
    </main>
  );
}

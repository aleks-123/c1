import StudentDirectryCard from "@/components/StudentDirectryCard";
import { getStudents } from "@/lib/students";
import styles from "./page.module.css";

export const metadata = {
  title: "Studenti",
  description: "Server side fech",
};

export default async function page() {
  const students = await getStudents();

  const testENV = process.env.PRIVATE_SPOTIFY_KEY;

  console.log(process.env);
  console.log(testENV);

  return (
    <main className={styles.page}>
      <section className={styles.directory}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Next.js · Server Component</p>
          <h1>Server side component</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur tempora maiores, eum esse non sed
            rem, minus recusandae, beatae asperiores debitis voluptas? Necessitatibus at dolorem molestiae saepe
            aspernatur sed facere!
          </p>

          <p className={styles.studentCount}>
            <strong>{students.length}</strong> broj na studenti zapisano
          </p>
        </div>

        <div className={styles.studentGrid}>
          {students.map((student) => (
            <StudentDirectryCard key={student.id} student={student} />
          ))}
        </div>
      </section>
    </main>
  );
}

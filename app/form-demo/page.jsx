import StudentRegistrastionDemo from "@/components/StudentRegistrastionDemo";
import styles from "./page.module.css";

export const metadata = {
  title: "React forms demo",
  description: "Validacija na inputi, lifting state",
};

export default function page() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <h1>React forms</h1>
      </header>
      <StudentRegistrastionDemo />
    </main>
  );
}

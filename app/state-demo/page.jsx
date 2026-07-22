//* State e memorija na kompnentata
import Counter from "@/components/Counter";
import styles from "./page.module.css";
import CounterDemo from "@/components/CounterDemo";

export default function page() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>State demo</p>
        <h1>Ineterakcija vo React i Next.js</h1>
        <div className={styles.explanation}>
          <p>Sate demo stranicata e Server Component</p>
          <p>A Counter e Client Component</p>
        </div>
      </section>

      <Counter inicialCount={10} />
      <CounterDemo />
    </main>
  );
}

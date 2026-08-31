"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sashkotest@com.mk");
  const [password, setPassword] = useState("1234t");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Najavuvanjeto ne uspea.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Ne mozheme da se povrzheme so serverot.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.intro}>
          <p className={styles.eyebrow}>NextClass</p>
          <h1 id="login-title">Najava</h1>
          <p>Vnesi gi tvoite podatoci za da prodolzhish.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Lozinka</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Najavuvanje..." : "Najavi se"}
          </button>
        </form>
      </section>
    </main>
  );
}

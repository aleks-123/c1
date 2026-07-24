"use client";

import { useEffect, useState } from "react";
import styles from "./FetchsingleUser.module.css";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function FetchsingleUser() {
  const [userId, setUserId] = useState("1");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${USERS_URL}/${userId}`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Neuspesna konekcija so backend");
        }

        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  function handleUserChange(event) {
    setUserId(event.target.value);
    setIsLoading(true);
    setError("");
  }

  return (
    <section className={styles.userSection}>
      <p className={styles.eyebrow}>Dynamic fetch</p>
      <h2>Korisnik</h2>

      <label className={styles.selectLabel} htmlFor="user-select">
        Izberi korisnik
      </label>
      <select className={styles.select} id="user-select" value={userId} onChange={handleUserChange}>
        <option value="1">Korisnik 1</option>
        <option value="2">Korisnik 2</option>
        <option value="3">Korisnik 3</option>
        <option value="4">Korisnik 4</option>
      </select>

      {isLoading && <p className={styles.status}>Se vcituva korisnikot...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && user && (
        <div className={styles.userCard}>
          <p className={styles.name}>{user.name}</p>
          <p className={styles.detail}>{user.email}</p>
          <p className={styles.detail}>{user.company?.name}</p>
        </div>
      )}
    </section>
  );
}

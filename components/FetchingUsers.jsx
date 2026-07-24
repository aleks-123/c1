"use client";
import { useState, useEffect } from "react";
import styles from "./FetchingUsers.module.css";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function FetchingUsers() {
  const [users, setUsers] = useState([]);
  const [watcherState, setWatcherState] = useState("test");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(USERS_URL);
        console.log(response);
        if (!response.ok) {
          throw new Error("Neuspesna konekcija so backend");
        }

        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <section className={styles.usersSection}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>useEffect + fetch</p>
        <h2>Users</h2>
        <p className={styles.subtitle}>Korisnici prezemeni od API.</p>
      </div>

      {isLoading && <p className={styles.status}>Se vcituvaat korisnicite...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && (
        <ul className={styles.userList}>
          {users.slice(0, 5).map((user) => (
            <li className={styles.userCard} key={user.id}>
              <strong className={styles.name}>{user.name}</strong>
              <span className={styles.email}>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// function 1 30
// function 2 1
// asnyc funkcija 3 1
// function 4 1
// function 5 1

// funkcija 0 50 sec
// funkcija 1 2ms
// funkcija 2 3ms
//? async funkcija 3 10sec fetch
//! funkcija 4 1ms
//! funkcija 5 9ms

//! async funkcija 1 10sec
//! async funkcija 2 5sec
//! async funckija 3 30sec
//! async funckija 4 5ms
//! async funkcija 5 10 sec

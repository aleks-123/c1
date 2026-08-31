"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./LogoutButton.module.css";

function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.replace("/");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button className={styles.button} type="button" onClick={handleLogout} disabled={isLoading} aria-busy={isLoading}>
      <span className={isLoading ? styles.spinner : styles.icon} aria-hidden="true">
        {!isLoading && "↪"}
      </span>
      {isLoading ? "Odjavuvanje..." : "Odjavi se"}
    </button>
  );
}

export default LogoutButton;

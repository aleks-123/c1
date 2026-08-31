"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function CarsPage() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchCars() {
      try {
        const response = await fetch("/api/cars", {
          credentials: "include",
        });

        if (response.status === 401) {
          router.replace("/login");
          router.refresh();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Ne uspeavme da gi prezememe kolite.");
        }

        if (!ignore) {
          setCars(data);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      ignore = true;
    };
  }, [router]);

  return (
    <main className={styles.page}>
      <section className={styles.directory}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>NextClass garage</p>
          <h1>Nashite koli</h1>
          <p className={styles.description}>Pregled na site koli prezemeni od zashtitenata Cars API ruta.</p>

          {!isLoading && !error && (
            <p className={styles.carCount}>
              <strong>{cars.length}</strong>
              {cars.length === 1 ? "kola" : "koli"}
            </p>
          )}
        </header>

        {isLoading && (
          <div className={styles.loadingGrid} aria-label="Se vcituvaat kolite">
            {[1, 2, 3].map((item) => (
              <div className={styles.skeleton} key={item} />
            ))}
          </div>
        )}

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && cars.length === 0 && (
          <div className={styles.emptyState}>
            <span aria-hidden="true">🚗</span>
            <h2>Nema dodadeno koli</h2>
            <p>Dodadi kola preku POST /api/cars i taa ke se pojavi tuka.</p>
          </div>
        )}

        {!isLoading && !error && cars.length > 0 && (
          <div className={styles.carGrid}>
            {cars.map((car) => (
              <article className={styles.carCard} key={car._id}>
                <div className={styles.cardTop}>
                  <span className={styles.carIcon} aria-hidden="true">
                    🚘
                  </span>
                  <span className={styles.year}>{car.year}</span>
                </div>

                <div className={styles.carName}>
                  <p>{car.brand}</p>
                  <h2>{car.model}</h2>
                </div>

                <div className={styles.colorRow}>
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: car.color || "#cbd5e1" }}
                    aria-hidden="true"
                  />
                  <span>Boja: {car.color || "Nema podatok"}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

import styles from "./ShopingCard.module.css";

export default function ShopingCard({ title, description, price, featured = false }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>{price}</p>
      <p className={styles.discount}>Popust 30%</p>
    </article>
  );
}

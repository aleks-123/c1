export default function ShopingCard({ title, description, price, featured = false }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{price}</p>
      <p>Popust 30%</p>
    </article>
  );
}

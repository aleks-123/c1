import ShopingCard from "@/components/ShopingCard";

export default function Home() {
  return (
    <div>
      <h1> Welcome to NEXT.JS</h1>
      <ShopingCard title="Logitech mouse pro" description="best gaming mouse" price="500" />
      <ShopingCard title="Razer" description="lightest mouse" price="380" />
      <ShopingCard title="Steel Series" description="laser pointer" price="222" />
    </div>
  );
}

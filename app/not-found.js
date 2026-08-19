import Link from "next/link";
import React from "react";

export default function GlobalNotFound() {
  return (
    <div>
      <p>404</p>
      <h1>Ovaa stranica ne postoi</h1>

      <div>
        <Link href="/">Nazad na pocetna</Link>
      </div>
    </div>
  );
}

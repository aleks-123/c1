"use client";

export default function RootError({ error, unstable_retry }) {
  return (
    <div>
      <p>Error</p>
      <h1>Nastana neocekuvana greska.</h1>
      <p> Aplikacijata ne padna celosno, zatoa NEXT.js go prikaza error.js </p>
      <div>
        <p>Error: {error.digst ?? "Imashe greska"}</p>
        <button type="button" onClick={() => unstable_retry()}>
          Obidi se povtorno
        </button>
      </div>
    </div>
  );
}

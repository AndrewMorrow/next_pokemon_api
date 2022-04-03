import React, { useEffect } from "react";
import useStore from "../src/store";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: any }) {
  const { setPokemon, pokemonArr } = useStore((state) => state.pokemon);

  useEffect(() => {
    const getAllPokemon = async () => {
      const res = await fetch("/api/pokemon/getAll");
      const data = await res.json();

      setPokemon(data);
    };
    if (pokemonArr.length === 0) getAllPokemon();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
}

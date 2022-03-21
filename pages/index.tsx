import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useStore from "../src/store";
import pokemonData from "../src/pokemonData.json";
import PokemonCard from "../components/PokemonCard";
import { Key, useEffect } from "react";
import FilterHome from "../components/FilterHome";
import { Pokemon } from "../src/globalTypes";

export async function getServerSideProps(context: any) {
  return {
    props: {
      pokemon: pokemonData,
    }, // will be passed to the page component as props
  };
}
interface Props {
  pokemon: [Pokemon];
}

const Home: NextPage<Props> = ({ pokemon }) => {
  const { setPokemonFilter, setPokemon } = useStore((state) => state.pokemon);
  const state = useStore((state) => state);

  useEffect(() => {
    console.log("running");
    setPokemon(pokemon);
    console.log("pokemon set");
    setPokemonFilter("bulb");
    console.log("filter set");

    console.log(state);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Gotta Query Em All</title>
        <meta name="description" content="Pokemon Next app with Zustand" />
      </Head>
      <FilterHome />
      <section className="flex items-center justify-between  flex-wrap my-10">
        {pokemon?.slice(0, 9).map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useStore from "../src/store";
import pokemonData from "../src/pokemonData.json";
import { PokemonOverview } from "../components/PokemonOverview";
import { Key } from "react";

interface Pokemon {
  id: 1;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: [string];
  base: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
}

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
  // const user = useStore((state) => state.user);

  return (
    <>
      <Head>
        <title>Gotta Query Em All</title>
        <meta name="description" content="Pokemon Next app with Zustand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        {pokemon?.slice(0, 10).map((pokemon: Pokemon) => (
          <PokemonOverview key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </>
  );
};

export default Home;

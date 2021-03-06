import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import useStore from "../src/store";
// import pokemonData from "../src/pokemonData.json";
import PokemonCard from "../components/PokemonCard";
// import { Key, useEffect, useState } from "react";
import FilterHome from "../components/FilterHome";
import { Pokemon } from "../src/globalTypes";
// import { prisma } from "../src/prismaConnect";
import Pagination from "../components/Pagination";
// import { useSession } from "next-auth/react";
// import Link from "next/link";

// import { signOut } from "next-auth/react";

// export async function getStaticProps(context: any) {
//   const pokemonData = await prisma.pokemon.findMany({
//     include: {
//       primaryTypeRelation: true,
//       secondaryTypeRelation: true,
//     },
//   });

//   return {
//     props: {
//       pokemonProps: pokemonData,
//     }, // will be passed to the page component as props
//   };
// }
// interface Props {
//   pokemonProps: [Pokemon];
// }

const Home: NextPage = () => {
  const { setPokemon, filteredPokemon, filterInput, pokemonArr } = useStore(
    (state) => state.pokemon
  );
  const { currentPage, sliceAmount, amountPerPage, setUseFiltered } = useStore(
    (state) => state.pagination
  );

  // const { data: session } = useSession();
  // console.log(session);
  // const state = useStore((state) => state);

  return (
    <>
      <FilterHome />
      <div className="py-2" />
      <Pagination />
      <section className="flex items-center justify-around gap-6 flex-wrap my-10">
        {filterInput
          ? filteredPokemon
              ?.slice(sliceAmount, sliceAmount + amountPerPage)
              .map((pokemon: Pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} size={300} />
              ))
          : pokemonArr
              ?.slice(sliceAmount, sliceAmount + amountPerPage)
              .map((pokemon: Pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} size={300} />
              ))}
      </section>
      <Pagination />
    </>
  );
};

export default Home;
